import { useParams } from "react-router-dom";
import { usePostContext } from "../context/postContext"
import { useEffect } from "react";
import IMG from '../assets/caio_freire.png'
import { Format } from "../utils/formatter";

export default function PostDetail() {
  const { selectedPost, getPostByID } = usePostContext();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    getPostByID(id!);
  }, []);

  if (selectedPost === null) {
    return <div className="flex items-center justify-center h-[calc(100vh-10rem)] mx-auto font-bold text-4xl">Post not found {":("}</div>
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4">
      <div className="flex flex-col w-full">

        <h2 className="text-5xl font-bold text-center pt-8">{selectedPost.title}</h2>

        <div className="flex flex-col py-8 text-center font-medium text-neutral-500">
          <span className="font-medium text-base">{Format(selectedPost.date)}</span>
          <span className="font-bold">by @{selectedPost.authorID}</span>
        </div>

        <img
          src={IMG}
          className="object-cover w-full max-h-[30rem] h-full rounded-md shadow-lg"
        />

        <div
          dangerouslySetInnerHTML={{ __html: selectedPost.content }}
          className="py-8"
        />

      </div>
    </div>
  )
}