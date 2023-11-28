import Footer from '../components/footer'
import Navbar from '../components/navbar'
import Post from '../components/post'

export default function Home() {
  return (
    <div className='h-full'>
      <Navbar />
      <div className='flex flex-col gap-12 pt-40 pb-20'>
        <Post />
        <Post />
        <Post />
      </div>
      <Footer />
    </div>
  )
}
