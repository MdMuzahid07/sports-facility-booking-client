/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import { useGetASingleProductQuery, useUpdateAProductMutation } from "@/redux/features/products/productApi";
import { toast } from "sonner";
import RichTextEditor from "@/components/richTextEditor/RichTextEditor";
import MultipleImageSelector from "@/utils/MultipleImageSelector";
import { useParams } from "react-router-dom";
import LoadingSpinner from "@/components/LoadingSpinner";

interface TProductData {
    title: string;
    description: string;
    price: number;
    quantity: number;
    stock: number;
}

const UpdateProduct = () => {
    const { productId } = useParams();
    const { register, handleSubmit } = useForm();
    const [updateAProduct, { data, isLoading, error }] = useUpdateAProductMutation();
    const { data: productCurrentData, isLoading: currentProductDataLoading } = useGetASingleProductQuery(productId);
    const [description, setDescription] = useState("");
    const [selectedImages, setSelectedImages] = useState<File[]>([]); // Store selected images




    // Append selected images without overwriting
    const handleImageSelection = (files: File[]) => {
        setSelectedImages((prevFiles) => [...prevFiles, ...files]);
    };




    const cleanEmptyOrNullValuesForPartialUpdate = (payload: Record<string, any>) => {
        const filteredPayload: Record<string, any> = {};
        for (const key in payload) {
            if (
                payload[key] !== 0 &&  // Exclude 0
                payload[key] !== "" &&  // Exclude empty strings
                payload[key] !== null && // Exclude null values
                payload[key] !== undefined // Exclude undefined values
            ) {
                filteredPayload[key] = payload[key];
            }
        }
        return filteredPayload;
    };



    const onSubmit = async (formData: any) => {
        const updateProductData: TProductData = {
            ...formData,
            description: description,
            price: Number(formData.price),
            quantity: Number(formData.quantity),
            stock: Number(formData.stock)
        };

        const cleanPayload = cleanEmptyOrNullValuesForPartialUpdate(updateProductData)


        const submitData = new FormData();

        /* This code block is checking if there are any selected images stored in the `selectedImages`
        state array. If there are selected images (i.e., `selectedImages` is truthy and its length is
        greater than 0), it iterates over each image in the array using `forEach` and appends each
        image to a `FormData` object named `submitData` using the `append` method. */
        if (selectedImages && selectedImages?.length > 0) {
            selectedImages?.forEach((image) => {
                submitData?.append("files", image);
            });
        }
        submitData.append("data", JSON.stringify(cleanPayload));

        try {
            const res = await updateAProduct({ productId, data: submitData }).unwrap();
            console.log(res, "update response")
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
                Update Product
            </h1>
            {
                currentProductDataLoading ? (<LoadingSpinner />) : (
                    <section className="bg-white p-8 rounded-lg mt-10 min-h-[450px] relative">
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="mb-8">
                                <Label className="mb-2" htmlFor="picture">Select Images</Label>
                                <MultipleImageSelector
                                    onImagesSelected={handleImageSelection}
                                    multiple={true}
                                    maxFiles={3}
                                    accept="image/png, image/jpeg"
                                />
                            </div>
                            {
                                !(selectedImages?.length > 0) && (
                                    <>
                                        <h1 className="text-xl mb-2">Current Images</h1>

                                        <div className="flex flex-wrap gap-8 mb-7">
                                            {
                                                productCurrentData?.data?.imageUrl?.map((img: string) => {
                                                    return (
                                                        <img className="w-44 h-28 object-cover object-center rounded-lg" src={img} alt="" />
                                                    )
                                                })
                                            }
                                        </div>
                                    </>
                                )
                            }
                            <section className="grid sm:grid-cols-2 gap-8 mb-8">
                                <section>
                                    <Label htmlFor="title">Product Title</Label>
                                    <Input {...register("title", { required: false })} type="text" placeholder={productCurrentData?.data?.title} />
                                </section>

                                <section>
                                    <Label htmlFor="price">Price</Label>
                                    <Input {...register("price", { required: false })} type="number" placeholder={productCurrentData?.data?.price} />
                                </section>
                                <section>
                                    <Label htmlFor="quantity">Minimum quantity buy </Label>
                                    <Input {...register("quantity", { required: false })} type="number" placeholder={productCurrentData?.data?.quantity} />
                                </section>
                                <section>
                                    <Label htmlFor="stock">Stock</Label>
                                    <Input {...register("stock", { required: false })} type="number" placeholder={productCurrentData?.data?.stock} />
                                </section>
                            </section>


                            <div className="my-8">
                                <Label htmlFor="des">Product Description</Label>
                                <div id="des" className="mt-1">
                                    <RichTextEditor value={description ? description : productCurrentData?.data?.description} onChange={setDescription} style="h-80" />
                                </div>
                            </div>


                            <section className="flex justify-end mt-16">
                                <Button type="submit" className="text-lg">Add Product</Button>
                            </section>
                        </form>
                    </section>
                )
            }
        </section>
    );
};

export default UpdateProduct;
