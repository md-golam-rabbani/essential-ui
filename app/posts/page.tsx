import { getPostsAction } from './actions/get-posts';
import { Posts } from './sub-components/posts';

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

          {/* Posts  */}
          {posts && !!posts.length && <Posts posts={posts} />}
        </div>
      </div>
    </div>
  );
}
