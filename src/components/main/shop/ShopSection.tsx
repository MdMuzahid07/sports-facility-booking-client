/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import { MoveRight } from "lucide-react";
import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
import { Link } from "react-router-dom";


const ShopSection = () => {
    const { data: allProducts } = useGetAllProductsQuery(undefined);


    return (
        <section className="bg-slate-200">
            <section className="max-w-7xl mx-auto pt-28 pb-32 px-4 xl:px-0">
                <h3 className="text-3xl md:text-5xl font-extrabold mb-5">Elevate Your Game with Premium Sports Gear</h3>
                <p className="text-xl md:text-2xl lg:text-3xl">Discover top-quality sports equipment and apparel to fuel your passion. Shop our selection and find everything you need to perform your best.</p>

                <section className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {
                        allProducts?.data?.slice(0, 8)?.map((product: any) => (
                            <ProductCard product={product} key={product?._id} />
                        ))
                    }
                </section>
                <section className="mt-14 flex justify-end">
                    <Link to="/store">
                        <Button className="rounded-none text-2xl font-bold py-1"> More Items <MoveRight className="ml-3" /></Button>
                    </Link>
                </section>
            </section>
        </section>
    )
}

export default ShopSection;