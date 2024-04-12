import { Routes, Route } from "react-router-dom"
import Login from "../screens/login"
import Home from "../screens/home"
import PostDetail from "../screens/post"
import CreatePost from "../screens/createPost"
import Recovery from "../screens/recovery"
import RecoveryCode from "../screens/recovery-code"

export const Router = () => {
  return (
    <Routes>
      <Route path="/admin" element={<Login />} />
      <Route path="/recovery" element={<Recovery />} />
      <Route path="/recovery/code" element={<RecoveryCode />} />
      <Route path="/" element={<Home />} />
      <Route path="/create/:id?" element={<CreatePost />} />
      <Route path="/post/:id" element={<PostDetail />} />
    </Routes>
  )
} 