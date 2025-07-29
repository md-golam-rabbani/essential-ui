'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

type SortOrder = 'desc' | 'asc';

const PAGE_SIZE = 20;
const GITHUB_API = 'https://api.github.com/search/repositories';

const buildQuery = (page: number, sortOrder: SortOrder) => {
  const query = 'stars:>1';
  return `${GITHUB_API}?q=${query}&sort=stars&order=${sortOrder}&page=${page}&per_page=${PAGE_SIZE}`;
};

const App: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(buildQuery(page, sortOrder));
        const newRepos = response.data.items;

        setRepos((prev) => [...prev, ...newRepos]);
      } catch (err) {
        setError(
          typeof err === 'string' ? err : 'Failed to fetch repositories.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [page, sortOrder]);

  const handleSortChange = (order: SortOrder) => {
    setRepos([]);
    setPage(1);
    setSortOrder(order);
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-4 text-2xl font-bold">GitHub Repositories</h1>

      <div className="mb-4">
        <label className="mr-2 font-medium">Sort by Stars:</label>
        <select
          value={sortOrder}
          onChange={(e) => handleSortChange(e.target.value as SortOrder)}
          className="rounded border px-2 py-1"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      {repos.map((repo) => (
        <div
          key={repo.id}
          className="mb-4 rounded border p-4 shadow-sm transition hover:shadow-md"
        >
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            <h2 className="text-xl font-semibold text-blue-600">{repo.name}</h2>
          </a>
          <p className="text-sm text-gray-700">{repo.description}</p>
          <div className="mt-2 text-sm text-gray-500">
            ⭐ {repo.stargazers_count} by {repo.owner.login}
          </div>
        </div>
      ))}

      {loading && <p className="mt-4 text-center">Loading...</p>}
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}
    </div>
  );
};

export default App;
