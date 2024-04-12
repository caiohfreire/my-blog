import { Form, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Axios } from "../service/axios";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "../components/lib/ui/input-otp";
import { Button } from "../components/lib/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/lib/ui/form";

export default function RecoveryCode() {
  const navigate = useNavigate();

  const codeSchema = z.object({
    code: z.string().min(6, {
      message: "Your one-time password must be 6 characters.",
    }),
  })

  type CodeSchema = z.infer<typeof codeSchema>;

  const form = useForm<CodeSchema>({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      code: "",
    },
  })

  async function handleValidation(data: CodeSchema) {
    try {
      console.log(data)
      // await Axios.post('/RecoverycODE', { "code": data });

      // navigate('/recovery/code');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <h1 className="font-bold text-2xl py-8 text-neutral-800 dark:text-white">
        Insert the code below
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleValidation)} className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>One-Time Password</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSeparator />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
      {/* <form
        {...form}
        onSubmit={handleSubmit(handleRecovery)}
        className="flex flex-col gap-6 pb-8 sm:w-[80%] sm:shadow-none md:max-w-[50%] md:p-20"
      >
        <div className="flex justify-center items-center w-full">
          <InputOTP maxLength={6}>
            <InputOTPGroup {...register("code")}>
              <InputOTPSlot index={0} {...register("code")} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button
          type="submit"
          className="bg-[#27272A] dark:bg-[#F4F4F5] text-stone-800 dark:text-white p-3 rounded-[8px] font-medium tracking-wide w-full"
        >
          Send
        </Button>
      </form> */}
    </div >
  )
}
