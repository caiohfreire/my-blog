import { Button, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toolbarOptions } from "../constants/quill";
import '../index.css';
import { Axios } from "../service/axios";
import { useAuthContext } from "../context/authContext";

export default function CreatePost() {
  const { user } = useAuthContext();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [files, setFiles] = useState<File | undefined>(undefined);
  const [content, setContent] = useState('');

  useEffect(() => {
    console.log(files);
  }, [files]);

  function ChangeFile(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    }
    setFiles(target.files[0]);
    console.log('File', files)
  }

  function handleQuillChange(value: string) {
    setContent(value);
  }

  async function handlePublish(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const id = user?.id;
    const author = user?.name;

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('summary', summary);
      formData.append('image', files!);
      formData.append('content', content);
      formData.append('author', author!);
      formData.append('authorID', id!);

      console.log('FORM DATA:', Object.fromEntries(formData.entries()));

      const response = await Axios.post('/Publish', formData);
      console.log('RESPONSE:', response.data);

      setTitle('');
      setSummary('');
      setFiles(undefined);
      setContent('');
    } catch (error) {
      console.error('Error publishing post:', error);
    }
  }

  return (
    <div className="flex max-w-[1280px] mx-auto px-4 h-screen">
      <form
        encType="multipart/form-data"
        onSubmit={handlePublish}
        className="flex flex-col gap-4 pb-4 w-full pt-[120px] min-h-screen h-full">
        <Input
          value={title}
          placeholder="Title"
          onChange={(ev) => setTitle(ev.target.value)} />
        <Input
          value={summary}
          placeholder="Summary"
          onChange={(ev) => setSummary(ev.target.value)} />
        <div className="flex">
          <input
            type="file"
            name="image"
            onChange={ChangeFile}
            className="relative w-full inline-flex tap-highlight-transparent shadow-sm px-3 bg-default-100 data-[hover=true]:bg-default-200 group-data-[focus=true]:bg-default-100 min-h-unit-10 rounded-medium flex-col items-start justify-center gap-0 transition-background motion-reduce:transition-none !duration-150 outline-none group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background h-14 py-3" />
        </div>
        <ReactQuill
          value={content}
          onChange={handleQuillChange}
          modules={toolbarOptions}
          theme="snow"
          className="rounded-xl border-none  h-full overflow-auto shadow-xl 
          bg-[#F4F4F5] dark:bg-[#27272A] text-stone-800 dark:text-white"
        />
        <Button
          color="warning"
          type="submit"
          className="shadow-lg font-bold max-h-10 h-full">
          Publish Post
        </Button>
      </form>
    </div>
  )
}