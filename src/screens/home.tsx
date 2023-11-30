import Footer from '../components/footer'
import Post from '../components/post'

export default function Home() {
  return (
    <div className='h-full'>
      <div className='flex flex-col gap-12 pt-14 pb-20'>
        <Post />
        <Post />
        <Post />
      </div>
      <Footer />
    </div>
  )
}
