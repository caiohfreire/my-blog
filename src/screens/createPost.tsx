import { Button, Input } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
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
  const [files, setFiles] = useState<File[]>([]);
  const [content, setContent] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = ev.target.files!;
    setFiles(Array.from(selectedFiles));

    // Limpar o valor do campo de arquivo
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  useEffect(() => {
    console.log(files);
  }, [files]);

  function handleQuillChange(value: string) {
    setContent(value);
  }

  async function handlePublish(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const id = user?.id;
    const author = user?.name;
    console.log(author)

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('summary', summary);

      if (files[0] instanceof File) {
        formData.append('image', files[0]);
      }
      formData.append('content', content);
      formData.append('author', author!);
      formData.append('authorID', id!);

      const response = await Axios.post('/publish', formData);
      console.log('RESPONSE:', response.data);

      setTitle('');
      setSummary('');
      setFiles([]);
      setContent('');
    } catch (error) {
      console.error('Error publishing post:', error);
    }
  }

  return (
    <div className="flex max-w-[1280px] mx-auto px-4 h-[calc(100vh-80px)]">
      <form
        onSubmit={handlePublish}
        className="flex flex-col gap-4 pt-14 pb-4 w-full min-h-full">
        <Input
          placeholder="Title"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)} />
        <Input
          placeholder="Summary"
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)} />
        <input
          type="file"
          onChange={handleFileChange}
          className="relative w-full inline-flex tap-highlight-transparent shadow-sm px-3 bg-default-100 data-[hover=true]:bg-default-200 group-data-[focus=true]:bg-default-100 min-h-unit-10 rounded-medium flex-col items-start justify-center gap-0 transition-background motion-reduce:transition-none !duration-150 outline-none group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background h-14 py-2" />
        {/* <Input
          type="file"
          onChange={handleFileChange} /> */}
        <ReactQuill
          value={content}
          onChange={handleQuillChange}
          modules={toolbarOptions}
          theme="snow"
          className="rounded-xl border-none max-h-[50vh] h-full overflow-auto shadow-xl 
          bg-[#F4F4F5] dark:bg-[#27272A] text-stone-800 dark:text-white"
        />
        <Button
          color="warning"
          type="submit"
          className="shadow-lg font-bold">
          Publish Post
        </Button>
      </form>
    </div>
  )
}