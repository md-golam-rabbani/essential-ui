'use client';

import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { githubApi } from './lib/api';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDebouncedValue } from './hooks/useDebouncedValue';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

type Repository = {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
};

type GitHubResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[];
};

type SortOrder = 'desc' | 'asc';

const PAGE_SIZE = 5;
const PATH = '/search/repositories';

const buildQuery = (
  path: string,
  page: number,
  sortOrder: SortOrder,
  searchQuery: string
): string => {
  const params = new URLSearchParams({
    q: searchQuery?.trim() ? `${searchQuery} in:name` : `stars:>1`,
    // q: searchQuery.length ? searchQuery : 'stars:>1',
    sort: 'stars',
    order: sortOrder,
    page: page.toString(),
    per_page: PAGE_SIZE.toString()
  });

  return `${path}?${params.toString()}`;
};

const fetchRepositories = async (
  page: number,
  sortOrder: SortOrder,
  searchQuery: string
): Promise<GitHubResponse> => {
  const res = await githubApi.get<GitHubResponse>(
    buildQuery(PATH, page, sortOrder, searchQuery)
  );
  return res.data;
};

export function MainComponent() {
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebouncedValue(searchTerm, 1000);

  const { data, error, isPending, isFetching } = useQuery<
    GitHubResponse,
    Error
  >({
    queryKey: ['repos', page, sortOrder, debouncedSearch],
    queryFn: () => fetchRepositories(page, sortOrder, debouncedSearch)
  });

  const totalPages = useMemo(() => {
    return data ? Math.ceil(data.total_count / PAGE_SIZE) : 0;
  }, [data]);

  let contentUI;

  if (error) {
    contentUI = (
      <div className="py-10">
        <p className="mt-4 text-center text-red-500">{error.message}</p>
      </div>
    );
  } else if (isFetching || isPending) {
    contentUI = (
      <div className="space-y-4">
        {Array.from({ length: PAGE_SIZE }).map((_, i) => (
          <div key={i} className="rounded-lg border p-4 shadow-lg">
            <Skeleton className="mb-2 h-6 w-1/3" />
            <Skeleton className="mb-1 h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  } else if (data && !data?.items.length) {
    contentUI = (
      <div className="py-10">
        <p className="mt-4 text-center text-red-500">No data avaiable</p>
      </div>
    );
  } else {
    contentUI = (
      <>
        {data.items.length > 0 && (
          <div className="space-y-4">
            {data.items.map((repo) => (
              <div
                key={repo.id}
                className="rounded-lg border p-4 shadow-sm transition duration-300 hover:shadow-lg"
              >
                <h2 className="text-xl font-semibold text-blue-600">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {repo.name}
                  </a>
                </h2>
                <p className="text-sm text-gray-700">{repo.description}</p>
                <div className="mt-2 text-sm text-gray-500">
                  ⭐ {repo.stargazers_count} by {repo.owner.login}
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    );
  }

  return (
    <div className="py-10 xl:py-12">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-2xl font-bold">GitHub Repositories</h2>

          <div className="mb-4 flex items-center gap-4">
            <Input
              value={searchTerm}
              placeholder="Search repositories..."
              onChange={(e) => {
                setPage(1);
                setSearchTerm(e.target.value);
              }}
            />
          </div>

          <div className="mb-4 flex items-center gap-4">
            <Select
              value={sortOrder}
              onValueChange={(value) => setSortOrder(value as SortOrder)}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Descending</SelectItem>
                <SelectItem value="asc">Ascending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {contentUI}

          {/* Pagination Controls */}
          {(!isPending || !isFetching) &&
            data &&
            data.total_count > PAGE_SIZE && (
              <div className="mt-6 flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">
                  Page {page} of {totalPages || 1}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  disabled={!data || page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
