/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { useState } from "react";
import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
import ProductCard from "@/components/main/shop/ProductCard";
import PageTopByDefault from "@/utils/PageTopByDefault";
import { Helmet } from "react-helmet-async";


const SportsEquipments = () => {
  const [loadMore, setLoadMore] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const { data: allProducts } = useGetAllProductsQuery(undefined);

  console.log(allProducts)


  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setLoadMore(loadMore + 4);
      setIsLoading(false);
    }, 2000);
  }


  PageTopByDefault();

  return (
    <>
      <Helmet>
        <title>PlayTime Pro | Sports Equipments</title>
        <meta
          name="description"
          content="PlayTime Pro, all sports equipments, store page"
        />
      </Helmet>

      <section className="bg-slate-200">
        <section className="max-w-7xl mx-auto pt-20 pb-32 px-4 xl:px-0">
          <h3 className="text-3xl md:text-5xl font-bold mb-5">Store</h3>
          <p className="text-xl md:text-2xl lg:text-3xl">Discover top-quality sports equipment and apparel to fuel your passion. Shop our selection and find everything you need to perform your best.</p>

          <section className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {
              allProducts?.data?.slice(0, loadMore)?.map((product: any) => (
                <ProductCard product={product} key={product?._id} />
              ))
            }
          </section>
          <section className="mt-14 flex justify-end">
            {
              allProducts?.data?.length > loadMore ? <Button onClick={handleLoadMore} className="rounded-full text-lg font-bold py-1"> {isLoading ? "Loading..." : "Load More"} <MoveRight className="ml-3" /></Button> : <p className="text-2xl"> Available equipments Loaded</p>
            }
          </section>
        </section>
      </section>
    </>

  )
}

export default SportsEquipments;