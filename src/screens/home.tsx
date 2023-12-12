import React, { useEffect } from 'react';
import Footer from '../components/footer'
import Post from '../components/post'
import { usePostContext } from '../context/postContext'
import { IPostHomeType } from '../model/IPost';
import { SkeletonHome } from '../utils/skeletonHome.tsx';

export default function Home() {

  const { getPosts, post, isLoading } = usePostContext();

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className='relative min-h-screen'>;
      <div className='flex flex-col gap-12 pt-[8%] pb-[10%] flex-1 sm:pt-[25%] sm:pb-[25%] md:pt-[8%] md:pb-[10%]'>

        {isLoading ? (
          <div className='absolute left-1/2 transform -translate-x-1/2 max-w-[1280px] w-full gap-8 space-y-8'>
            {[1, 2].map((index) => (
              <React.Fragment key={index}>
                {SkeletonHome()}
              </React.Fragment>
            ))}
          </div>
        ) : (
          post && post.map((p: IPostHomeType) => (
            <Post key={p.id} data={p} />
          ))
        )}
      </div>

      <div className='absolute bottom-0 w-full'>
        <Footer />
      </div>
    </div>
  )
}
