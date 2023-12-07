import { useEffect } from 'react';
import Footer from '../components/footer'
import Post from '../components/post'
import { usePostContext } from '../context/postContext'
import { IPostHomeType } from '../model/IPost';

export default function Home() {

  const { getPosts, post } = usePostContext();

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className='relative min-h-screen'>;
      <div className='flex flex-col gap-12 pt-32 pb-20 flex-1'>
        {post?.map((p: IPostHomeType) => (
          <Post key={p.id} data={p} />
        ))}
      </div>

      <div className='absolute bottom-0 w-full'>
        <Footer />
      </div>
    </div>
  )
}
