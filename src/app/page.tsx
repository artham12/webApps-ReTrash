import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { Button, buttonVariants } from "@/components/ui/button"
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react"
import Link from "next/link"
import BgWaveHeader from "@/components/bgWaveHeader"
import ProductRell from "@/components/productReel"

const perks = [
  {
    name: "Instan Delivery",
    Icon: ArrowDownToLine,
    description: "Get Your Assets delivered to your email in seconds and download them right away."
  },
  {
    name: "Guaranteed Quality",
    Icon: CheckCircle,
    description: "Every asset on our platform is verifed by our team to ensure our higest quality standards. Not happy? We offer a 30-day refund guarantee "
  },
  {
    name: "For the Planet",
    Icon: Leaf,
    description: "We've pledged 1% of sales to the preservation and restoration of the natural enviroment  "
  },


]

const Home = () => {
  return (
    <>

      <BgWaveHeader />


      <MaxWidthWrapper>

        <div className=" mx-auto text-center flex flex-col items-center max-w-3xl pt-96 ">
          <h1 className=" pt-32 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            A place to sell your trash to  {''}
            <span className=" text-green-600">
              get a lot of profit
            </span>
            .
          </h1>
          <p className=" mt-6 text-lg max-w-prose text-muted-foreground">
            Welcome to ReTrash. Give your waste a chance to turn into money
          </p>
          <div className=" flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="/products" className={buttonVariants()}> Trending Products</Link>
            <Button variant="ghost">Our Quality Promise &rarr;</Button>
          </div>
        </div>

        <ProductRell
          query={{ sort: "desc", limit: 4 }}
          href="/products"
          title="New Product"
        />
      </MaxWidthWrapper>

      <section className=" border-t border-gray-200 bg-gray-50">
        <MaxWidthWrapper className=" py-20">
          <div className=" grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <div key={perk.name} className=" text-center md:flex md:items-start md:text-left lg:block lg:text-center">
                <div className=" md:flex-shrink-0 flex justify-center">
                  <div className=" h-16 w-16 flex items-center justify-center rounded-full bg-green-100 text-green-900">
                    {<perk.Icon className=" w-1/3 h-1/3" />}
                  </div>
                </div>
                <div className=" mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  {perk.name}
                  <h3>
                    <p className=" mt-3 text-sm text-muted-foreground"></p>
                    {perk.description}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  )

}
export default Home

