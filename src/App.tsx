import { NextUIProvider } from "@nextui-org/react";
import { Router } from "./routes/router";
import { AuthProvider } from "./context/authContext";
import Navbar from "./components/navbar";
import { PostProvider } from "./context/postContext";

function App() {

  return (
    <NextUIProvider>
      <AuthProvider>
        <PostProvider>
          <Navbar />
          <Router />
        </PostProvider>
      </AuthProvider>
    </NextUIProvider>
  )
}

export default App;