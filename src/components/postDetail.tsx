import { NavigateOptions, useParams } from "react-router-dom";
import { IPost, usePostContext } from "../context/postContext"
import { useEffect } from "react";
import { Format } from "../utils/formatter";
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';
import { useAuthContext } from "../context/authContext";
import { SkeletonDetail } from "../utils/skeletonDetail";
import { useNavigate } from 'react-router-dom';
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";

interface CustomNavigateOptions extends NavigateOptions {
  post?: IPost;
}

export default function PostDetail() {
  const { isAuthenticated } = useAuthContext();
  const { selectedPost, getPostByID, isLoading, deletePost } = usePostContext();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    getPostByID(id!);
  }, []);

  if (selectedPost === null) {
    return <div className="flex items-center justify-center h-screen mx-auto font-bold text-4xl">Post not found {":("}</div>
  }

  const sanitizedContent = DOMPurify.sanitize(selectedPost!.content);

  const handleEdit = () => {
    const navigateOptions: CustomNavigateOptions = { state: { post: selectedPost } };
    navigate(`/create/${id}`, navigateOptions);
  };

  const handleDelete = () => {
    // const navigateOptions: CustomNavigateOptions = { state: { post: selectedPost } };
    try {
      deletePost(id!);
      // navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 h-full pt-32" >

      {isLoading ? (
        <SkeletonDetail />
      ) : (
        <div className="relative flex flex-col w-full">

          <h2 className="text-5xl font-bold text-center">{selectedPost.title}</h2>

          <div className="inline-flex items-center justify-center w-full">

            <div className="flex flex-col py-8 text-center min-w-full font-medium text-neutral-500">
              <span className="font-medium text-base">{Format(selectedPost.date)}</span>
              <span className="font-bold">by @{selectedPost.author.name}</span>
            </div>

            {isAuthenticated && (
              <div className="flex gap-2 absolute top-0 right-0">
                <FaRegTrashCan
                  onClick={handleDelete}
                  className="text-lg dark:text-red-500 cursor-pointer" title="Delete" />
                <FiEdit
                  onClick={handleEdit}
                  className="text-lg dark:text-[#F3A424] cursor-pointer" title="Edit" />
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