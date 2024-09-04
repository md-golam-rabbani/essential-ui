import { getPostsAction } from './actions/get-posts';

export default async function Page() {
  const posts = await getPostsAction();

  return (
    <div className="bg-gray-100 py-20">
      <div className="container">
        <div className="space-y-10 lg:space-y-14">
          {/* Section title  */}
          <div className="mx-auto max-w-[800px] text-center">
            <h2 className="text-[3rem] font-bold text-black"> Posts</h2>
            <p className="text-gray-800">{`{JSON} Placeholder`}</p>
          </div>

          {posts && !!posts.length && (
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-10">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="space-y-4 rounded-lg bg-white p-10 shadow transition-all duration-300 hover:shadow-lg"
                >
                  <p>{post.id}</p>
                  <p>{post.userId}</p>
                  <h3 className="font-bold text-black">{post.title}</h3>
                  {post.body && <p className="text-slate-700">{post.body}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
