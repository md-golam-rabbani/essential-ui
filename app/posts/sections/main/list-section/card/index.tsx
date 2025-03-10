import { Typography } from '@/components/typography';

export type PostCardProps = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export function PostCard({ userId, id, title, body }: PostCardProps) {
  return (
    <div className="space-y-3 rounded-xl bg-white p-6 shadow-lg">
      <Typography size="p2" className="text-blue-400">
        User id: {userId}
      </Typography>
      <Typography size="p2">Post id: {id}</Typography>
      <Typography size="h3" className="font-bold">
        {title}
      </Typography>
      <Typography size="p1">{body}</Typography>
    </div>
  );
}
