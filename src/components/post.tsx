import { Button, ButtonGroup } from "@nextui-org/react";

export default function Post() {

  return (
    <div className="max-w-[1280px] mx-auto px-4">
      <div
        className={`gap-4 w-full border border-stone-500 rounded-md shadow-lg overflow-auto
          sm:flex sm:flex-col
          md:grid md:grid-cols-2 `}
      >
        <img
          src="https://raw.githubusercontent.com/pmndrs/drei/HEAD/logo.jpg"
          className="w-full max-h-[500px] h-full shadow"
        />
        <div className="flex flex-col justify-between p-4 h-full">

          <div className="flex flex-col gap-2">
            <h2 className="text-4xl font-bold">Post's Title</h2>
            <div className="flex gap-4 items-center ">
              <h2 className="text-base font-bold text-neutral-800 dark:text-neutral-300">Caio Freire</h2>
              <span className="text-sm font-medium">Nov 27, 2023 13:01</span>
            </div>
          </div>

          <p className="line-clamp-5 break-words">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pulvinar magna sed enim luctus, ut viverra dui molestie. Suspendisse ut aliquam lacus. Aenean ullamcorper orci magna, ac luctus risus posuere non. Morbi eget auctor lorem. Nullam metus est, lobortis vitae gravida nec, rhoncus nec ante.</p>

          <Button
            color="warning"
            className="bg-stone-900 dark:bg-[#F3A424] shadow-md text-white font-medium tracking-wide w-full xl:max-w-[50%] xl:self-end">
            See more
          </Button>
        </div>
      </div>
    </div>
  )
}
