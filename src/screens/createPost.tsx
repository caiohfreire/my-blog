import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toolbarOptions } from "../constants/quill";
import '../index.css';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [files, setFiles] = useState([]);
  const [content, setContent] = useState('');

  function handlePublish(ev: any) {
    ev.preventDefault()
    console.log(files)
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
        <Input type="file"
          onChange={(ev) => setFiles(ev.target.files)} />
        <ReactQuill
          value={content}
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