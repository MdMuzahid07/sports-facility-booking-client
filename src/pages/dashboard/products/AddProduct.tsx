/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import { useCreateProductMutation } from "@/redux/features/products/productApi";
import { toast } from "sonner";

interface TProductData {
    title: string;
    description: string;
    price: number;
    quantity: number;
    stock: number;
}

const AddProduct = () => {
    const { register, handleSubmit, reset } = useForm();
    const [file, setFile] = useState<File | null>(null);
    const [createProduct, { data, isLoading, error }] = useCreateProductMutation();


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files?.[0] || null);
    };

    const onSubmit = async (formData: any) => {
        const productData: TProductData = {
            ...formData,
            price: Number(formData.price),
            quantity: Number(formData.quantity),
            stock: Number(formData.stock)
        };

        const submitData = new FormData();
        if (file) submitData.append("file", file);
        submitData.append("data", JSON.stringify(productData));

        try {
            await createProduct(submitData).unwrap();
            reset();
            setFile(null);
        } catch (error) {
            console.log(error, "error from try catch");
        }
    };


    if (isLoading) {
        toast.loading("Creating...", { id: "createProductToastId" });
    }

    if (error) {
        toast.error((error as any)?.data?.message, { id: "createProductToastId" });
    }

    if (data && data?.success) {
        toast.success("Done", { id: "createProductToastId" });
    }


    return (
        <section className="py-10">
            <h1 className="gap-8 text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-extrabold">
                Add Product
            </h1>
            <section className="bg-white p-8 rounded-lg mt-10 min-h-[450px] relative">
                <form onSubmit={handleSubmit(onSubmit)} className="grid sm:grid-cols-2 gap-8">
                    <section>
                        <Label htmlFor="title">Product Title</Label>
                        <Input {...register("title", { required: true })} type="text" placeholder="Product Title" />
                    </section>
                    <section>
                        <Label htmlFor="description">Description</Label>
                        <Textarea {...register("description", { required: true })} placeholder="Product Description" />
                    </section>
                    <section>
                        <Label htmlFor="price">Price</Label>
                        <Input {...register("price", { required: true })} type="number" placeholder="Price" />
                    </section>
                    <section>
                        <Label htmlFor="quantity">Minimum quantity buy </Label>
                        <Input {...register("quantity", { required: true })} type="number" placeholder="Quantity" />
                    </section>
                    <section>
                        <Label htmlFor="stock">Stock</Label>
                        <Input {...register("stock", { required: true })} type="number" placeholder="Stock" />
                    </section>
                    <section>
                        <Label htmlFor="file">Product Image</Label>
                        <Input type="file" onChange={handleFileChange} placeholder="Product Image" />
                    </section>
                    <section className="absolute right-8 bottom-8">
                        <Button type="submit" className="text-lg">Add Product</Button>
                    </section>
                </form>
            </section>
        </section>
    );
};

export default AddProduct;
