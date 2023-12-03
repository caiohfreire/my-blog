import { useEffect } from 'react';
import Footer from '../components/footer'
import Post, { IPostHomeType } from '../components/post'
import { usePostContext } from '../context/postContext'

export default function Home() {

  const { getPosts, post } = usePostContext();

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className='max-h-full min-h-screen'>
      <div className='flex flex-col gap-12 pt-14 pb-20'>
        {post?.map((p: IPostHomeType) => (
          <Post key={p.id} data={p} />
        ))}
      </div>
      <Footer />
    </div>
  )
}
