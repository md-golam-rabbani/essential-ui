import { IPost } from '../../interface';

interface IPosts {
  posts: IPost[];
}

export function Posts({ posts }: IPosts) {
  return (
    <>
      {/* Posts  */}
      {posts && !!posts.length && (
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {posts.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </div>
      )}
    </>
  );
}

function Post({ id, title, body, userId }: IPost) {
  return (
    <div
      key={id}
      className="space-y-4 rounded-lg bg-white p-10 shadow transition-all duration-300 hover:shadow-lg"
    >
      <p>{id}</p>
      <p>{userId}</p>
      <h3 className="text-[1.25rem] font-bold text-black">{title}</h3>

      {body && <p className="text-slate-700">{body}</p>}
    </div>
  );
}
