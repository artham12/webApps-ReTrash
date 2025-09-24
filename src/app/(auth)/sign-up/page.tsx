"use client"
import { Icons } from "@/components/icons";
import {
  Button,
  buttonVariants
} from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TAuthCredentialsValidator,
  AuthCredentialsValidator,
} from "@/lib/validators/account.credentials.validator";
import { useForm } from "react-hook-form";
import { trpc } from "@/trpc/client";
import BgWaveHeader from "@/components/bgWaveHeader";
import { toast } from "sonner"
import { ZodError } from "zod";
import { useRouter } from "next/navigation";


const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator)
  });

  const router = useRouter()

  const { mutate, isLoading } =
    trpc.auth.createPayloadUser.useMutation({
      onError: (err) => {
        if (err.data?.code === "CONFLICT") {
          toast.error(" This email is already in use. Sign in instead?"
          )
          return
        }

        if (err instanceof ZodError) {
          toast.error(err.issues[0].message)

          return
        }

        toast.error(" Something want wrong. Please try again "
        )
      },
      onSuccess: ({ sentToEmail }) => {
        toast.success(`Verification email sent to ${sentToEmail}.`)
        router.push('/verify-email?to=' + sentToEmail)
      }
    })


  const onSubmit = ({
    email,
    password,
  }: TAuthCredentialsValidator) => {
    mutate({ email, password })
  };

  return (
    <>
      <BgWaveHeader />
      <div className=" container relative flex   flex-col items-center justify-center pt-20 ">
        <div className=" lg:pt-40 ">
          <div className="mx-auto flex w-full  flex-col justify-center space-y-6 sm:w-[600px]  bg-gradient-to-br from-slate-500 to-green-600 opacity-80 rounded-[20px] shadow-xl shadow-gray-600  p-8">
            <div className="flex flex-col items-center space-y-6 text-center   ">
              <Icons.sign className="h-30 w-28 " />
              <h1 className="text-2xl font-bold text-white">Create An Account</h1>

            </div>
            <div className="grid gap-6">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                  <div className="grid gap-1 py-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input
                      {...register("email")}
                      className={cn({
                        "focus-visible:ring-red-500": errors.email,
                      })}
                      placeholder="you@example.com"
                    />
                    {errors?.email && (
                      <p className=" text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-1 py-2">
                    <Label htmlFor="password" className="text-white"  >Password</Label>
                    <Input
                      {...register("password")}
                      type="password"
                      className={cn({
                        "focus-visible:ring-red-500": errors.password,
                      })}
                      placeholder="Password"
                    />
                    {errors?.password && (
                      <p className=" text-sm text-red-500">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <Button className=" shadow-xl">Sing up</Button>
                  <Link
                   
                    className={buttonVariants({
                      variant: "link",
                      className: "gap-1.5 text-white ",
                    })}
                    href="/sign-in" >
                    Already have an account? Sign-in
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Page;
