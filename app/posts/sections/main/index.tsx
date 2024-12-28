'use client';

import { Typography } from '@/components/typography';
import { PostCardProps } from './list-section/card';
import { PostListSection } from './list-section';
import { CheckboxControl } from '@/components/inputs/checkbox-control';
import { cn } from '@/lib/shadcn/utils';
import { InputHeading } from '@/components/inputs/common/input-heading';
import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { InputControl } from '@/components/inputs/input-control';
import debounce from 'lodash.debounce';

// Styles
const inlineWrapperClasses = cn('flex flex-wrap gap-x-4 gap-y-2');
const inputItemParentClasses = cn('flex flex-row items-center gap-2 text-base');
const inputGroupParentClasses = cn('grid gap-1');

export type PostsMainSectionProps = {
  posts: PostCardProps[];
};

const ITEMS_PER_PAGE = 10;

export default function PostsMainSection({ posts }: PostsMainSectionProps) {
  const [usersIds, setUsersIds] = useState<string[]>([]);

  const [pageNumber, setPageNumber] = useState(1);

  const [searchTerm, setSearchTerm] = useState(''); // Immediate input value
  const [search, setSearch] = useState(''); // Debounced search value

  const { ref, inView } = useInView({ threshold: 0.5 });

  const userIds = useMemo(() => {
    return Array.from(new Set(posts.map(({ userId }) => String(userId))));
  }, [posts]);

  // Memoized filtered posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesUserIds =
        usersIds.length === 0 || usersIds.includes(String(post.userId));

      const matchesSearch =
        search.trim() === '' ||
        post.title.toLowerCase().includes(search.trim().toLowerCase());

      return matchesUserIds && matchesSearch;
    });
  }, [posts, usersIds, search]);

  // Visible posts with pagination
  const visiblePosts = useMemo(() => {
    return filteredPosts.slice(0, pageNumber * ITEMS_PER_PAGE);
  }, [filteredPosts, pageNumber]);

  // Infinite scroll logic
  useEffect(() => {
    if (inView && pageNumber * ITEMS_PER_PAGE < filteredPosts.length) {
      setPageNumber((prev) => prev + 1);
    }
  }, [inView, pageNumber, filteredPosts]);

  // Debounced search logic
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearch(value); // Update the actual search state after debounce
        setPageNumber(1); // Reset pagination
      }, 300),
    []
  );

  // Handle input changes
  const handleInputChange = (value: string) => {
    setSearchTerm(value); // Update the input value immediately
    debouncedSearch(value); // Trigger debounced search logic
  };

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // Handle checkbox state changes
  const handleCheckboxChange = (userId: string, isChecked: boolean) => {
    setUsersIds((prev) =>
      isChecked ? [...prev, userId] : prev.filter((id) => id !== userId)
    );
    setPageNumber(1); // Reset pagination on filter change
  };

  return (
    <div className="space-y-6">
      <Typography size="h1">Posts</Typography>

      <div className="grid grid-cols-1 items-baseline lg:grid-cols-[320px_auto]">
        <div className="sticky top-20">
          <Typography size="p1" className="mb-4">
            Number of posts:{' '}
            <span className="font-bold">{visiblePosts.length}</span>
          </Typography>

          <InputControl
            type="text"
            name="search"
            placeholder="Search by title"
            value={searchTerm}
            onInputChange={(e) => handleInputChange(e.target.value)}
          />

          {userIds.length > 0 && (
            <fieldset className={inputGroupParentClasses}>
              <InputHeading label="User Ids" tagName="legend" />

              {userIds.map((userId) => (
                <div key={userId} className={inlineWrapperClasses}>
                  <label className={inputItemParentClasses}>
                    <CheckboxControl
                      name={userId}
                      value={userId}
                      checked={usersIds.includes(userId)}
                      onCheckboxChange={(e) =>
                        handleCheckboxChange(userId, e.target.checked)
                      }
                    />
                    {userId}
                  </label>
                </div>
              ))}
            </fieldset>
          )}
        </div>
        <div>
          <PostListSection posts={visiblePosts} />
          <div ref={ref}></div>
        </div>
      </div>
    </div>
  );
}
