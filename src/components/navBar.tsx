import Link from "next/link"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { buttonVariants } from "./ui/button"
import { Icons } from "./icons"
import NavItems from "./navItems"
import Cart from "./ui/cart"
import { getServerSideUser } from "@/lib/payload-utils"
import { cookies } from "next/headers"
import UserAccountNav from "./userAccountNav"


const NavBar = async () => {
    const nextCookies = cookies()
    const { user } = await getServerSideUser(nextCookies)

    return (
        <div className=" bg-white sticky z-50 top-0 inset-x-0 h-16 ">
            <header className=" relative bg-color-satu shadow-xl">
                <MaxWidthWrapper>
                    <div className=" border-b border-gray-600">
                        <div className="flex items-center h-16 ">

                            {/* TODO: Mobile Nav */}
                            <div className=" ml-4 flex lg:ml-0">
                                <Link href="/">
                                    <Icons.logo className=" w-40 h-40" />
                                </Link>
                            </div>
                            <div className=" hidden z-50 lg:ml-8 lg:block lg:self-stretch text-white">
                                <NavItems />
                            </div>

                            <div className=" ml-auto flex item-center">
                                <div className=" hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6 text-white">
                                    {user ? null : (
                                        <Link href="/sign-in" className={buttonVariants({
                                            variant: "ghost",
                                        })}>
                                            Sign In
                                        </Link>
                                    )}

                                    {user ? null : (
                                        <span
                                            className="h-6 w-px bg-white"
                                            aria-hidden="true" />
                                    )}

                                    {user ? (
                                        <UserAccountNav user={user} />
                                    ) : (<Link
                                        href="/sign-up"
                                        className={buttonVariants({
                                            variant: "ghost"
                                        })}>
                                        Create Account
                                    </Link>
                                    )}

                                    {user ? (
                                        <span
                                            className="h-6 w-px bg-white"
                                            aria-hidden="true" />
                                    ) : null}

                                    {user ? null : (
                                        <div className=" flex lg:ml-6">
                                            <span
                                                className="h-6 w-px bg-white"
                                                aria-hidden="true" />
                                        </div>
                                    )}

                                    <div className=" ml-4 flow-root lg:ml-6">
                                        <Cart />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </header>

        </div>
    )
}
export default NavBar