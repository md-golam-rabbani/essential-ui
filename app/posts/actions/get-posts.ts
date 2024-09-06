import { IPost } from '../interface';

const api: string = `${process.env.JSON_PLACEHOLDER_BASE_URL}/posts`;

export async function getPostsAction() {
  const res = await fetch(api);
  const posts: IPost[] = await res.json();

  return posts;
}
