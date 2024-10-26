/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import { useGetASingleProductQuery, useUpdateAProductMutation } from "@/redux/features/products/productApi";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

interface TProductData {
    title: string;
    description: string;
    price: number;
    quantity: number;
    stock: number;
}

const removeEmptyFields = (obj: Record<string, any>) => {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => value !== "" && value !== null && value !== undefined)
    );
};

const UpdateProduct = () => {
    const { productId } = useParams();
    const { register, handleSubmit, reset } = useForm();
    const [file, setFile] = useState<File | null>(null);
    const [imgPreview, setImgPreview] = useState("");

    const [updateAProduct, { data, isLoading, error }] = useUpdateAProductMutation();
    const { data: product } = useGetASingleProductQuery(productId);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        if (selectedFile) {
            setImgPreview(URL.createObjectURL(selectedFile));
            setFile(selectedFile);
        }
    };

    const onSubmit = async (formData: any) => {
        console.log(formData)

        const productData: TProductData = {
            ...formData,
            price: Number(formData.price),
            quantity: Number(formData.quantity),
            stock: Number(formData.stock)
        };

        const updateData = removeEmptyFields(productData);

        const submitData = new FormData();
        if (file) submitData.append("file", file);
        submitData.append("data", JSON.stringify(updateData));

        try {
            await updateAProduct({ productId, data: submitData });
            reset();
            setFile(null);
        } catch (error) {
            console.log(error, "error from try catch");
        }
    };


    if (isLoading) {
        toast.loading("Creating...", { id: "updateProductToastId" });
    }

    if (error) {
        toast.error((error as any)?.data?.message, { id: "updateProductToastId" });
    }

    if (data && data?.success) {
        toast.success("Done", { id: "updateProductToastId" });
    }

    return (
        <section className="py-10">
            <h1 className="gap-8 text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-extrabold">
                Update Product
            </h1>
            <section className="bg-white p-8 rounded-lg mt-10 min-h-[450px] relative">
                <form onSubmit={handleSubmit(onSubmit)} className="grid sm:grid-cols-2 gap-8">
                    <section>
                        <Label htmlFor="title">Product Title</Label>
                        <Input {...register("title")} type="text" placeholder={product ? product?.data?.title : "Product Title"} />
                    </section>
                    <section>
                        <Label htmlFor="description">Description</Label>
                        <Textarea {...register("description")}
                            placeholder={product ? product?.data?.description : "Product Description"} />
                    </section>
                    <section>
                        <Label htmlFor="price">Price</Label>
                        <Input {...register("price")} type="number" placeholder={product ? product?.data?.price : "Price"} />
                    </section>
                    <section>
                        <Label htmlFor="quantity">Minimum quantity buy </Label>
                        <Input {...register("quantity")} type="number" placeholder={product ? product?.data?.quantity : "Quantity"} />
                    </section>
                    <section>
                        <Label htmlFor="stock">Stock</Label>
                        <Input {...register("stock")} type="number" placeholder={product ? product?.data?.stock : "Stock"} />
                    </section>
                    <section className="mb-20">
                        <Label htmlFor="file">Product Image</Label>
                        <img
                            className="my-4 w-80"
                            src={imgPreview || product?.data?.imageUrl || ""}
                            alt={product?.data?.title || "Product Image Preview"}
                        />
                        <Input type="file" onChange={handleFileChange} placeholder="Product Image" />
                    </section>
                    <section className="absolute right-8 bottom-8">
                        <Button type="submit" className="text-lg">Update Product</Button>
                    </section>
                </form>
            </section>
        </section>
    );
};

export default UpdateProduct;
