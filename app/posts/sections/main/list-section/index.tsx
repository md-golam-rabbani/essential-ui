import { PostCard, PostCardProps } from './card';

export type PostListSectionPorps = {
  posts: PostCardProps[];
};

export function PostListSection({ posts }: PostListSectionPorps) {
  return (
    <>
      {posts && !!posts.length && (
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      )}
    </>
  );
}
