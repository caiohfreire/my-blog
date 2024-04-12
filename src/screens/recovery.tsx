import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Axios } from "../service/axios";
import { Button } from "../components/lib/ui/button";
import { Input } from "../components/lib/ui/input";

export default function Recovery() {
  const navigate = useNavigate();
  const recoverySchema = z.object({
    email: z.string().email()
  })

  type RecoverySchema = z.infer<typeof recoverySchema>;

  const { register, handleSubmit, formState: { errors } } = useForm<RecoverySchema>({
    resolver: zodResolver(recoverySchema)
  });


  async function handleRecovery(data: RecoverySchema) {
    try {
      await Axios.post('/Recovery', { "email": data.email });
      navigate('/recovery/code');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <h1 className="font-bold text-2xl py-8 text-neutral-800 dark:text-white">Recovery your password</h1>
      <form
        onSubmit={handleSubmit(handleRecovery)}
        className="flex flex-col gap-6 pb-8 sm:w-[80%] sm:shadow-none md:max-w-[50%] md:p-20"
      >
        <div className="flex flex-col gap-2">
          <Input
            type="email"
            color='warning'
            placeholder="Enter your email"
            {...register("email", { required: "This is required" })}
          />
          {errors.email && <span className="px-2 text-sm text-zinc-500">{errors.email.message}</span>}
        </div>

        <Button
          type="submit"
          disabled={Object.keys(errors).length > 0}
          className="bg-stone-900 dark:bg-[#F1A223] text-white font-medium tracking-wide w-full disabled:cursor-not-allowed disabled:scale-1 disabled:active:scale-100"
        >
          Sign In
        </Button>
      </form>
    </div >
  )
}
