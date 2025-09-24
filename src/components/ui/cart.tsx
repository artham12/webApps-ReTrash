"use client"
import { ShoppingCart } from "lucide-react"
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./sheet"
import { Separator } from "./separator"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"
import { buttonVariants } from "./button"
import Image from "next/image"
import { useCart } from "@/hooks/use-cart"
import { ScrollArea } from "./scroll-area"
import CartItem from "../cartItem"
import { useEffect, useState } from "react"



const Cart = () => {
    const { items } = useCart()
    const itemCount = items.length

    const [isMounted, setIsMounted] = useState<Boolean>(false)
    
    useEffect (() =>{
        setIsMounted(true)
    }, [])

    const cartTotal = items.reduce(
        (total, { product }) => total + product.price,
        0
    )


    const fee = 1

    return (
        <Sheet>
            <SheetTrigger className="group -m-2 flex items-center p-2">
                <ShoppingCart 
                aria-hidden="true"
                 className=" h-6 w-6 flex-shrink-0 text-white group-hover:text-black" />
                <span className=" ml-2 text-sm font-medium text-green-50 group-hover:text-black  ">
                    { isMounted ? itemCount : 0}
                </span>
            </SheetTrigger>
            <SheetContent className=" flex w-full flex-col pr-0 sm:max-w-lg">
                <SheetHeader className=" space-y-2.5 pr-6">
                    <SheetTitle>Cart({itemCount})</SheetTitle>
                </SheetHeader>
                {itemCount > 0 ? (
                    <>
                        <div className=" flex w-full flex-col pr-6">
                            <ScrollArea>
                                {items.map(({ product }) => (
                                    <CartItem
                                        product={product}
                                        key={product.id} />
                                ))}
                            </ScrollArea>
                        </div>
                        <div className=" space-y-4 pr-6">
                            <Separator />
                            <div className=" space-y-1.5 pr-6">
                            <div className="flex">
                                    <span className="flex-1">
                                        Shipping
                                    </span>
                                    <span>Free</span>
                                </div>
                                <div className="flex">
                                    <span className="flex-1">
                                        Transaction Fee
                                    </span>
                                    <span>{formatPrice(fee)}</span>
                                </div>
                                <div className="flex">
                                    <span className="flex-1">
                                        Total
                                    </span>
                                    <span>{formatPrice(cartTotal + fee)}</span>
                                </div>
                            </div>

                            <SheetFooter>
                                <SheetTrigger asChild>
                                    <Link
                                        href="/cart"
                                        className={buttonVariants({
                                            className: "w-full",
                                        })}>
                                        Continue to Checkout
                                    </Link>
                                </SheetTrigger>
                            </SheetFooter>
                        </div>
                    </>
                ) : (
                    <div className=" flex h-full flex-col items-center justify-center space-y-1">
                        <div
                            aria-hidden="true"
                            className=" relative mb-4 h-60 w-60 text-muted-foreground">
                            <Image
                                src="/retrash-empty-bag.jpg"
                                fill
                                alt="empty shopping cart retrash"
                            />

                        </div>
                        <div className=" flex text-xl font-semibold">
                            Your Cart Is Empty
                        </div>
                        <SheetTrigger asChild>
                            <Link href="/products" className={buttonVariants({
                                variant: "link",
                                size: "sm",
                                className: "text-sm text-muted-foreground"
                            })}>
                                Add items to your cart to checkout
                            </Link>
                        </SheetTrigger>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}
export default Cart