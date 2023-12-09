import { useParams } from "react-router-dom";
import { usePostContext } from "../context/postContext"
import { useEffect } from "react";
import { Format } from "../utils/formatter";
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';
import { useAuthContext } from "../context/authContext";
import { SkeletonDetail } from "../utils/skeletonDetail";

export default function PostDetail() {
  const { isAuthenticated } = useAuthContext();
  const { selectedPost, getPostByID, isLoading } = usePostContext();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    getPostByID(id!);
  }, []);

  if (selectedPost === null) {
    return <div className="flex items-center justify-center h-screen mx-auto font-bold text-4xl">Post not found {":("}</div>
  }

  const sanitizedContent = DOMPurify.sanitize(selectedPost!.content);

  return (
    <div className="max-w-[1280px] mx-auto px-4 h-full pt-32" >

      {isLoading ? (
        <SkeletonDetail />
      ) : (
        <div className="flex flex-col w-full">

          <h2 className="text-5xl font-bold text-center">{selectedPost.title}</h2>

          <div className="relative inline-flex items-center justify-center w-full">

            <div className="flex flex-col py-8 text-center min-w-full font-medium text-neutral-500">
              <span className="font-medium text-base">{Format(selectedPost.date)}</span>
              <span className="font-bold">by @{selectedPost.author}</span>
            </div>

            {isAuthenticated && (
              <div className="absolute right-0 w-2/12">
                <button className="border border-stone-500 p-4 w-full rounded-md shadow-lg text-white dark:text-black bg-stone-900 dark:bg-[#F3A424]">
                  Edit
                </button>
              </div>
            )}

          </div>

          <img
            src={`data:image/png;base64,${selectedPost.image}`}
            className="object-cover w-full max-h-[30rem] h-full rounded-md shadow-lg"
          />

          <div className="ql-editor py-8" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />

        </div>
      )}
    </div >
  )
}