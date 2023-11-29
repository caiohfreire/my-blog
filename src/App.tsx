import { NextUIProvider } from "@nextui-org/react";
import { Router } from "./routes/router";
import { AuthProvider } from "./context/authContext";

function App() {

  return (
    <NextUIProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </NextUIProvider>
  )
}

export default App;