import { Router } from "./routes/router";
import { AuthProvider } from "./context/authContext";
import Navbar from "./components/navbar";
import { PostProvider } from "./context/postContext";
import { DarkModeProvider } from "./context/dark-mode-context";

function App() {

  return (
    <DarkModeProvider>
      <AuthProvider>
        <PostProvider>
          <Navbar />
          <Router />
        </PostProvider>
      </AuthProvider>
    </DarkModeProvider>
  )
}

export default App;