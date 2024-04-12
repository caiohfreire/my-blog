import { IoMdSunny } from "react-icons/io";
import { IoMoon } from "react-icons/io5";
import { Switch } from "../components/lib/ui/switch";
import { useDarkModeContext } from "../context/dark-mode-context";

export default function Toggle() {
  const { savedTheme, toggleTheme } = useDarkModeContext();
  return (
    <Switch
      defaultChecked={savedTheme === "dark"}
      className="dark"
      onCheckedChange={toggleTheme}
    />
  );
}