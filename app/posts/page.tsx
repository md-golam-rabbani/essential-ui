import { posts } from './data';
import PostsMainSection from './sections/main';

export default function Page() {
  return (
    <div className="bg-slate-100 py-24">
      <div className="container">
        <PostsMainSection posts={posts} />
      </div>
    </div>
  );
}
