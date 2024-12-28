'use client';

import { Typography } from '@/components/typography';
import { PostCardProps } from './list-section/card';
import { PostListSection } from './list-section';
import { CheckboxControl } from '@/components/inputs/checkbox-control';
import { cn } from '@/lib/shadcn/utils';
import { InputHeading } from '@/components/inputs/common/input-heading';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

// Styles
const inlineWrapperClasses = cn('flex flex-wrap gap-x-4 gap-y-2');
const inputItemParentClasses = cn('flex flex-row items-center gap-2 text-base');
const inputGroupParentClasses = cn('grid gap-1');

export type PostsMainSectionProps = {
  posts: PostCardProps[];
};

const ITEMS_PER_PAGE = 10;

export default function PostsMainSection({ posts }: PostsMainSectionProps) {
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [pageNumber, setPageNumber] = useState(1);
  const [visiblePosts, setVisiblePosts] = useState(
    filteredPosts?.slice(0, ITEMS_PER_PAGE)
  );
  const extractUserIds = posts?.map(({ userId }) => String(userId));

  const _userIds = Array.from(new Set(extractUserIds));

  const [usersIds, setUsersIds] = useState<typeof _userIds>([]);

  const { ref, inView } = useInView({ threshold: 0.5 });

  // Function to load posts
  const loadMorePosts = useCallback(() => {
    if (pageNumber * ITEMS_PER_PAGE >= filteredPosts.length) return;

    const updatedPosts = filteredPosts.slice(
      0,
      (pageNumber + 1) * ITEMS_PER_PAGE
    );
    setVisiblePosts(updatedPosts);
    setPageNumber((prev) => prev + 1);
  }, [filteredPosts, pageNumber]);

  // Infinite scroll logic
  useEffect(() => {
    if (inView) {
      loadMorePosts();
    }
  }, [inView, loadMorePosts]);

  // Handle checkbox state changes
  const handleCheckboxChange = (userId: string, isChecked: boolean) => {
    const updatedUserIds = isChecked
      ? [...usersIds, userId]
      : usersIds.filter((id) => id !== userId);

    setUsersIds(updatedUserIds);

    const _filterdPosts = posts?.filter((post) => {
      const matchesUserIds =
        updatedUserIds?.length === 0
          ? true
          : updatedUserIds.includes(String(post.userId));

      return matchesUserIds;
    });

    setFilteredPosts(_filterdPosts);
    setPageNumber(1);
    setVisiblePosts(_filterdPosts?.slice(0, ITEMS_PER_PAGE));
  };

  return (
    <div className="space-y-6">
      <Typography size="h1">Posts</Typography>

      <div className="grid grid-cols-1 items-baseline lg:grid-cols-[320px_auto]">
        <div className="sticky top-20">
          <Typography size="p1" className="mb-4">
            Number of posts:{' '}
            <span className="font-bold">{visiblePosts?.length}</span>
          </Typography>
          {_userIds && !!_userIds.length && (
            <fieldset className={inputGroupParentClasses}>
              <InputHeading label={'User Ids'} tagName="legend" />

              {_userIds.map((userId, index) => (
                <div key={index} className={inlineWrapperClasses}>
                  <label className={inputItemParentClasses}>
                    <CheckboxControl
                      name={userId}
                      value={userId}
                      onCheckboxChange={(e) => {
                        handleCheckboxChange(userId, e.target.checked);
                      }}
                      checked={usersIds?.includes(userId)}
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
