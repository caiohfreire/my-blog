import { Routes, Route } from "react-router-dom"
import Login from "../screens/login"
import Home from "../screens/home"
import PostDetail from "../screens/post"
import CreatePost from "../screens/createPost"

export const Router = () => {
  return (
    <Routes>
      <Route path="/admin" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreatePost />} />
      <Route path="/post" element={<PostDetail />} />
    </Routes>
  )
} 