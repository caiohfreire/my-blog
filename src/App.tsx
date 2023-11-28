import { NextUIProvider } from "@nextui-org/react";
import { Router } from "./routes/router";

function App() {

  return (
    <NextUIProvider>
        <Router />
    </NextUIProvider>
  )
}

export default App;