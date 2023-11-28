import { Routes, Route } from "react-router-dom"
import Login from "../screens/login"
import Home from "../screens/home"


export const Router = () => {
  return (
    <Routes>
      <Route path="/admin" element={<Login />} />
      <Route path="/" element={<Home />} />
    </Routes>
  )
} 