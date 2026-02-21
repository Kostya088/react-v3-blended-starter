import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import PostDetailsClient from './PostDetails.client';
import { fetchPostById } from '@/lib/api';

interface PostDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function PostDetails({ params }: PostDetailsProps) {
  const queryClient = new QueryClient();
  const { id } = await params;
  console.log(typeof id);
  const parsedId = Number(id);
  console.log(typeof parsedId);
  await queryClient.prefetchQuery({
    queryKey: ['post', parsedId],
    queryFn: () => fetchPostById(parsedId),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostDetailsClient />
    </HydrationBoundary>
  );
}
