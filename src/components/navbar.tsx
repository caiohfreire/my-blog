import { useAuthContext } from '../context/authContext';
import Toggle from '../utils/toggle';
import { FaPowerOff, FaNewspaper } from "react-icons/fa6";
import { Tooltip } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { isAuthenticated, Logout } = useAuthContext();
  const router = useNavigate();

  return (
    <div className='block'>
      <nav className="fixed top-0 z-50 flex w-full h-20 bg-neutral-950 dark:bg-stone-200 shadow-xl">
        <div className="max-w-[1280px] flex justify-between px-4 w-full items-center mx-auto">
          <h2 className="font-bold text-2xl tracking-wider text-white dark:text-stone-800 cursor-pointer" onClick={() => router('/')}>
            FORCE
          </h2>
          <div className='flex items-center gap-4'>
            {isAuthenticated && (
              <ul className='flex items-center gap-8'>

                <Tooltip content="Write a new post">
                  <li className='text-white dark:text-stone-800'>
                    <FaNewspaper className="w-5 h-5 cursor-pointer" onClick={() => router('/create')} />
                  </li>
                </Tooltip>

                <Tooltip content="Logout">
                  <li className='text-white dark:text-stone-800'>
                    <FaPowerOff className="w-5 h-5" onClick={Logout} />
                  </li>
                </Tooltip>
              </ul>
            )}
            <Toggle />
          </div>
        </div>
      </nav>
    </div>
  )
}
