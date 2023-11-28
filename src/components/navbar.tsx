import Toggle from '../utils/toggle';

export default function Navbar() {

  return (
    <nav className="fixed top-0 flex w-full h-20 bg-neutral-950 dark:bg-stone-200 shadow-xl">
      <div className="max-w-[1280px] flex justify-between px-4 w-full items-center mx-auto">
        <h2 className="font-bold text-2xl text-white dark:text-stone-800">MyBlog</h2>
          <Toggle />
      </div>
    </nav>
  )
}
