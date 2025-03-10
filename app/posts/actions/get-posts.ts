import { IPost } from '../interface';

const baseAPI: string =
  process.env.JSON_PLACEHOLDER_BASE_URL ||
  'https://jsonplaceholder.typicode.com';

export async function getPostsAction() {
  const res = await fetch(`${baseAPI}/posts`);
  const posts: IPost[] = await res.json();

  return posts;
}
