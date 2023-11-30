import { NextUIProvider } from "@nextui-org/react";
import { Router } from "./routes/router";
import { AuthProvider } from "./context/authContext";
import Navbar from "./components/navbar";

function App() {

  return (
    <NextUIProvider>
      <AuthProvider>
        <Navbar />
        <Router />
      </AuthProvider>
    </NextUIProvider>
  )
}

export default App;