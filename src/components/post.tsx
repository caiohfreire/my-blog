import { useNavigate } from "react-router-dom";
import { Format } from "../utils/formatter";
import { IPostProps } from "../model/IPost";
import { Button } from "./lib/ui/button";

export default function Post({ data }: IPostProps) {
  const router = useNavigate();

  return (
    <div className="max-w-[1280px] mx-auto px-4 w-full">
      <div
        className={`gap-4 w-full border border-stone-500 rounded-md shadow-lg overflow-auto
          sm:flex sm:flex-col
          md:grid md:grid-cols-2 `}
      >
        <img
          src={`data:image/png;base64,${data.image}`}
          className="w-[400px] min-w-full h-[200px] min-h-full object-cover shadow"
        />
        <div className="flex flex-col justify-between p-4 h-full">

          <div className="flex flex-col gap-2">
            <h2 className="text-4xl font-bold">{data.title}</h2>
            <div className="flex gap-4 items-center ">
              <h2 className="text-base font-bold text-neutral-800 dark:text-neutral-300">{data.author.name}</h2>
              <span className="text-sm font-medium">{Format(data.date)}</span>
            </div>
          </div>

          <p className="line-clamp-5 break-words">{data.summary}</p>

          <Button
            onClick={() => router(`/post/${data.id}`)}
            color="warning"
            className="bg-stone-900 dark:bg-[#F3A424] my-4 shadow-md text-white font-medium tracking-wide w-full xl:max-w-[50%] xl:self-end">
            See more
          </Button>
        </div>
      </div>
    </div>
  )
}
