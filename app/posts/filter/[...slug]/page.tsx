import { fetchPosts } from '@/lib/api';
import PostsClient from './Posts.client';

interface PostPageParams {
  params: Promise<{ slug: string[] }>;
}

export default async function PostsPage({ params }: PostPageParams) {
  const { slug } = await params;
  console.log(slug);
  const userId: string = slug[0];
  const data = await fetchPosts({
    searchText: '',
    page: 1,
    ...(userId && userId !== 'All' && { userId }),
  });

  return (
    <>
      <PostsClient initialData={data} userId={userId} />
    </>
  );
}
