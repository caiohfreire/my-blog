import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
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

  function handleFileChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = ev.target.files!;
    setFiles(Array.from(selectedFiles));
    console.log(files)
  }

  function handleQuillChange(value: string) {
    setContent(value);
  }

  async function handlePublish(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const id = user?.id;
    const author = user?.name;
    console.log(author)

    try {
      const data = {
        title,
        summary,
        image: files,
        content,
        author,
        authorID: id
      };
      console.log(data)

      const response = await Axios.post('/publish', data);
      console.log('RESPONSE:', response.data);
    } catch (error) {
      console.error('Error publishing post:', error);
    }

    setTitle('');
    setSummary('');
    setFiles([]);
    setContent('');
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
        <Input
          type="file"
          onChange={handleFileChange} />
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