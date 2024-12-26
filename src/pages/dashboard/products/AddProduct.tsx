/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import { useCreateProductMutation } from "@/redux/features/products/productApi";
import { toast } from "sonner";
import RichTextEditor from "@/components/richTextEditor/RichTextEditor";
import MultipleImageSelector from "@/utils/MultipleImageSelector";

interface TProductData {
    title: string;
    description: string;
    price: number;
    quantity: number;
    stock: number;
}

const AddProduct = () => {
    const { register, handleSubmit, reset } = useForm();
    const [createProduct, { data, isLoading, error }] = useCreateProductMutation();
    const [description, setDescription] = useState("");

    const [selectedImages, setSelectedImages] = useState<File[]>([]); // Store selected images

    // Append selected images without overwriting
    const handleImageSelection = (files: File[]) => {
        setSelectedImages((prevFiles) => [...prevFiles, ...files]);
    };


    const onSubmit = async (formData: any) => {
        const productData: TProductData = {
            ...formData,
            description: description,
            price: Number(formData.price),
            quantity: Number(formData.quantity),
            stock: Number(formData.stock)
        };

        const submitData = new FormData();
        /* This code block is checking if there are any selected images stored in the `selectedImages`
        state array. If there are selected images (i.e., `selectedImages` is truthy and its length is
        greater than 0), it iterates over each image in the array using `forEach` and appends each
        image to a `FormData` object named `submitData` using the `append` method. */
        if (selectedImages && selectedImages.length > 0) {
            selectedImages.forEach((image) => {
                submitData.append("files", image);
            });
        }
        submitData.append("data", JSON.stringify(productData));

        try {
            await createProduct(submitData).unwrap();
            reset();
            setDescription("");
            setSelectedImages([]);
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
                    <section className="grid sm:grid-cols-2 gap-8 mb-8">
                        <section>
                            <Label htmlFor="title">Product Title</Label>
                            <Input {...register("title", { required: true })} type="text" placeholder="Product Title" />
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
                    </section>


                    <div className="my-8">
                        <Label htmlFor="des">Product Description</Label>
                        <div id="des" className="mt-1">
                            <RichTextEditor value={description} onChange={setDescription} style="h-80" />
                        </div>
                    </div>


                    <section className="flex justify-end mt-16">
                        <Button type="submit" className="text-lg">Add Product</Button>
                    </section>
                </form>
            </section>
        </section>
    );
};

export default AddProduct;
