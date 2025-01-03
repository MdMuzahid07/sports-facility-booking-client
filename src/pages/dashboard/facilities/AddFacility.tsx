/* eslint-disable @typescript-eslint/no-explicit-any */
import RichTextEditor from "@/components/richTextEditor/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateFacilityMutation } from "@/redux/features/facilities/facilityApi";
import MultipleImageSelector from "@/utils/MultipleImageSelector";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const AddFacility = () => {
    const { register, handleSubmit, reset } = useForm();
    const [AddFacility, { error, data, isLoading }] = useCreateFacilityMutation();
    const [description, setDescription] = useState("");
    const [selectedImages, setSelectedImages] = useState<File[]>([]); // Store selected images

    // Append selected images without overwriting
    const handleImageSelection = (files: File[]) => {
        setSelectedImages((prevFiles) => [...prevFiles, ...files]);
    };


    if (isLoading) {
        return toast.loading("Please wait", { id: "createFacility" })
    };
    if (error) {
        toast.error(`${(error as any).data?.messages}`, { id: "createFacility" });
    }
    if (data && data.success) {
        toast.success("Faculty created successfully!", { id: "createFacility" });
    }


    const onSubmit = async (data: any) => {
        const facilityData = {
            ...data,
            description: description,
            pricePerHour: Number(data?.pricePerHour)
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
        submitData.append("data", JSON.stringify(facilityData));

        try {
            await AddFacility(submitData).unwrap();
            reset();
            setDescription("");
            setSelectedImages([]);
        } catch (error) {
            console.log(error, "error from try catch");
        }
    };



    return (
        <div className="py-10">
            <h1 className="gap-8 text-3xl md:text-4xl font-bold">
                Add Facility
            </h1>
            <div className="bg-white p-8 rounded-2xl mt-6 min-h-[450px]  relative">
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="mb-8">
                        <Label className="mb-2" htmlFor="picture">Select Images</Label>
                        <MultipleImageSelector
                            onImagesSelected={handleImageSelection}
                            multiple={true}
                            maxFiles={3}
                            style="rounded-2xl"
                            accept="image/png, image/jpeg"
                        />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-8 h-full">
                        <div>
                            <Label htmlFor="picture">Facility Name</Label>
                            <Input className="rounded-full drop-shadow-sm"  {...register("name", { required: true })} type="text" placeholder="Facility Name" />
                        </div>
                        <div>
                            <Label htmlFor="location">Location</Label>
                            <Input className="rounded-full drop-shadow-sm" {...register("location", { required: true })} id="location" type="text" placeholder="Facility Location" />
                        </div>
                        <div>
                            <Label htmlFor="price">Price Per Hour</Label>
                            <Input className="rounded-full drop-shadow-sm" id="price" {...register("pricePerHour", { required: true })} type="text" placeholder="Facility price per hour" />
                        </div>

                    </div>

                    <div className="my-8">
                        <Label htmlFor="des">Facility Description</Label>
                        <div id="des" className="mt-1">
                            <RichTextEditor value={description} onChange={setDescription} style="h-80" />
                        </div>
                    </div>
                    <div className=" mt-16 flex justify-end">
                        <Button type="submit" className="text-lg rounded-full">Add Facility</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddFacility;