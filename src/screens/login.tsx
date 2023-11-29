import { Input, Button } from "@nextui-org/react";
import { useAuthContext } from "../context/authContext";
import { useState } from "react";

export default function Login() {
  const { Login } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e: any) {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (trimmedEmail === '' || trimmedPassword === '') {
      console.log('Insert your informations')
      return;
    }

    try {
      await Login(trimmedEmail, trimmedPassword);
    } catch (err) {
      console.error(err);
      throw new Error();
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">

      <h1 className="font-bold text-2xl py-8 text-neutral-800 dark:text-white">Welcome back, Caio!</h1>

      <div className="flex flex-col gap-6 pb-8 
      sm:w-[80%] sm:shadow-none 
      md:max-w-[50%] md:p-20">
        <Input
          type="email"
          color='warning'
          label="Email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          placeholder="Enter your email"
          labelPlacement='inside'
          variant='faded'
          defaultValue="caio@freire.com"
          autoComplete="Off"
        />

        <div className="flex flex-col gap-2 w-full items-end">
          <span className="flex text-xs font-medium text-neutral-600 dark:text-neutral-400">Forget ur password?</span>

          <Input
            type="password"
            color='warning'
            label="Password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            placeholder="Enter your password"
            labelPlacement='inside'
            variant='faded'
            defaultValue="caio@freire.com"
          />
        </div>

        <Button
          onClick={handleLogin}
          className="bg-stone-900 dark:bg-[#F1A223] text-white font-medium tracking-wide w-full">Sign In</Button>
      </div>

    </div>
  )
}
