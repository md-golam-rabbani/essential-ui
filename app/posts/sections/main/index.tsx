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

// CSS classes
const inlineWrapperClasses = cn('flex flex-wrap gap-x-4 gap-y-2');
const inputItemParentClasses = cn('flex flex-row items-center gap-2 text-base');
const inputGroupParentClasses = cn('grid gap-1');

// Props for the main section component
export type PostsMainSectionProps = {
  posts: PostCardProps[];
};

// Number of items to display per page
const ITEMS_PER_PAGE = 10;
const CURRENT_PAGE_NUMBER = 1;
const SEARCH_DEBOUNCE_VALUE = 300;
const LOAD_MORE_DEBOUNCE_VALUE = 150;

/**
 * Main section component to display and filter posts.
 */
export default function PostsMainSection({ posts }: PostsMainSectionProps) {
  // State for selected user IDs from checkboxes
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  // State for search input field (immediate typing)
  const [searchTerm, setSearchTerm] = useState('');

  // State for debounced search value
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // State for the current page number in pagination
  const [currentPage, setCurrentPage] = useState(CURRENT_PAGE_NUMBER);

  // Intersection observer to detect when the user scrolls near the bottom
  const { ref, inView } = useInView({ threshold: 0.25 });

  // Unique user IDs extracted from posts
  const uniqueUserIds = useMemo(
    () => Array.from(new Set(posts.map(({ userId }) => String(userId)))),
    [posts]
  );

  // Compute filtered posts based on selected user IDs and search term
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Filter by user IDs
      const matchesUserIds =
        selectedUserIds.length === 0 ||
        selectedUserIds.includes(String(post.userId));

      // Filter by search term
      const matchesSearchTerm =
        debouncedSearchTerm.trim() === '' ||
        post.title
          .toLowerCase()
          .includes(debouncedSearchTerm.trim().toLowerCase());

      return matchesUserIds && matchesSearchTerm;
    });
  }, [posts, selectedUserIds, debouncedSearchTerm]);

  // Compute posts visible based on the current page
  const visiblePosts = useMemo(() => {
    const endIndex = Math.min(
      currentPage * ITEMS_PER_PAGE,
      filteredPosts.length
    );
    return filteredPosts.slice(0, endIndex);
  }, [filteredPosts, currentPage]);

  // Effect: Infinite scroll to load more posts
  useEffect(() => {
    const handlePagination = debounce(() => {
      if (inView && currentPage * ITEMS_PER_PAGE < filteredPosts.length) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    }, LOAD_MORE_DEBOUNCE_VALUE);

    handlePagination();
    return () => handlePagination.cancel();
  }, [inView, currentPage, filteredPosts]);

  useEffect(() => {
    if (currentPage * ITEMS_PER_PAGE > filteredPosts.length) {
      setCurrentPage(CURRENT_PAGE_NUMBER);
    }
  }, [filteredPosts, currentPage]);

  // Debounced search input handler
  const debouncedSearchHandler = useMemo(
    () =>
      debounce((value: string) => {
        // Update debounced search state
        setDebouncedSearchTerm(value);
        // Reset pagination on new search
        setCurrentPage(CURRENT_PAGE_NUMBER);
      }, SEARCH_DEBOUNCE_VALUE),
    []
  );

  // Cleanup debounce on component unmount
  useEffect(() => {
    return () => {
      debouncedSearchHandler.cancel();
    };
  }, [debouncedSearchHandler]);

  /**
   * Handle changes in the search input field.
   * @param value The current input value.
   */
  const handleSearchInputChange = (value: string) => {
    // Update immediate input state
    setSearchTerm(value);
    // Trigger debounced update
    debouncedSearchHandler(value);
  };

  /**
   * Handle checkbox state changes.
   * @param userId The user ID associated with the checkbox.
   * @param isChecked Whether the checkbox is checked or not.
   */
  const handleCheckboxChange = (userId: string, isChecked: boolean) => {
    setSelectedUserIds((prev) =>
      isChecked ? [...prev, userId] : prev.filter((id) => id !== userId)
    );

    // Reset pagination on filter change
    setCurrentPage(CURRENT_PAGE_NUMBER);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Typography size="h1">Posts</Typography>

      <div className="grid grid-cols-1 items-baseline gap-6 lg:grid-cols-[320px_auto]">
        {/* Sidebar Filters */}
        <div className="sticky top-20 space-y-4">
          <Typography size="p1">
            Number of posts:{' '}
            <span className="font-bold">{visiblePosts.length}</span>
          </Typography>

          {/* Search Input */}
          <InputControl
            type="text"
            name="search"
            placeholder="Search by title"
            value={searchTerm}
            onInputChange={(e) => handleSearchInputChange(e.target.value)}
          />

          {/* User ID Filters */}
          {uniqueUserIds.length > 0 && (
            <fieldset className={inputGroupParentClasses}>
              <InputHeading label="User Ids" tagName="legend" />

              {uniqueUserIds.map((userId) => (
                <div key={userId} className={inlineWrapperClasses}>
                  <label className={inputItemParentClasses}>
                    <CheckboxControl
                      name={userId}
                      value={userId}
                      checked={selectedUserIds.includes(userId)}
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

        {/* Main Content */}
        <div>
          {/* List of Posts */}
          <PostListSection posts={visiblePosts} />

          {/* Intersection Observer Reference */}
          <div ref={ref}></div>
        </div>
      </div>
    </div>
  );
}
