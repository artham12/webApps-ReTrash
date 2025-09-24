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
import { useRouter, useSearchParams } from "next/navigation";


const Page = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const isSeller = searchParams.get("as") === "seller"
    const origin = searchParams.get("origin")


    const continueAsSeller = () => {
        router.push("?as=seller")
    }

    const continueAsBuyer = () => {
        router.replace("/sign-in", undefined)
    }


    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<TAuthCredentialsValidator>({
        resolver: zodResolver(AuthCredentialsValidator)
    });


    const { mutate: signIn, isLoading } =
        trpc.auth.singIn.useMutation({
            onSuccess: () => {
                toast.success(" Signed in successfully")
                if (origin) {
                    router.push(`/${origin}`)
                } else if (isSeller) {
                    router.push('/sell')
                } else {
                    router.push('/')
                }

                router.refresh()
            },

            onError: (err) => {
                if (err.data?.code === "UNAUTHORIZED") {
                    toast.error("Invalid email or password.")
                }
            },
        })


    const onSubmit = ({
        email,
        password,
    }: TAuthCredentialsValidator) => {
        signIn({ email, password })
    };

    return (
        <>
            <BgWaveHeader />
            <div className=" container relative flex   flex-col items-center justify-center pt-20 ">
                <div className=" lg:pt-40 ">
                    <div className="mx-auto flex w-full  flex-col justify-center space-y-6 sm:w-[600px]  bg-gradient-to-br from-slate-500 to-green-600 opacity-80 rounded-[20px] shadow-xl shadow-gray-600  p-8">
                        <div className="flex flex-col items-center space-y-6 text-center   ">
                            <Icons.sign className="h-30 w-28 " />
                            <h1 className="text-2xl font-bold text-white">
                                Sign in to your {isSeller? "seller" : ''}{' '}
                                account
                            </h1>
                            <Link
                                className={buttonVariants({
                                    variant: "link",
                                    className: "gap-1.5 text-white ",
                                })}
                                href="/sign-up" >
                                Don&apos;t have an account?
                                <ArrowRight className="h-4 w-4" />
                            </Link>

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
                                    <Button className=" shadow-xl">Sing in</Button>

                                </div>
                            </form>

                            <div className=" relative ">
                                <div
                                    aria-hidden="true"
                                    className=" absolute inset-0 flex items-center">
                                    <span className=" w-full border-t " />
                                </div>
                                <div className=" relative flex justify-center text-xs uppercase ">
                                    <span className=" bg-background px-2 text-muted-foreground">
                                        or
                                    </span>
                                </div>
                            </div>

                            {isSeller ? (
                                <Button 
                                onClick={continueAsBuyer } 
                                variant="secondary" 
                                disabled={isLoading}>
                                    Continue as customer
                                </Button>
                            ) : (
                                <Button 
                                onClick={continueAsSeller}
                                variant="secondary" 
                                disabled={isLoading}>
                                    Continue as seller
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Page;
