/* eslint-disable @typescript-eslint/no-explicit-any */
import RichTextEditor from "@/components/richTextEditor/RichTextEditor"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import useImgBBUpload from "@/hooks/useImgBBUpload"
import { useCreateFacilityMutation } from "@/redux/features/facilities/facilityApi"
import MultipleImageSelector from "@/utils/MultipleImageSelector"
import { Label } from "@radix-ui/react-label"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const AddFacility = () => {
    const { img, getEvent } = useImgBBUpload();
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
    // console.log({ data, error });


    const onSubmit = async (data: any) => {
        const facilityData = {
            ...data,
            image: img,
            pricePerHour: Number(data?.pricePerHour)
        }

        await AddFacility(facilityData).unwrap();
        reset();
    };

    return (
        <div className="py-10">
            <h1 className="gap-8 text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-extrabold">
                Add Facility
            </h1>
            <div className="bg-white p-8 rounded-lg mt-14 min-h-[450px]  relative">
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="mb-8">
                        <Label className="mb-2" htmlFor="picture">Select Images</Label>
                        <MultipleImageSelector

                            onImagesSelected={handleImageSelection}
                            multiple={true}
                            maxFiles={3}
                            accept="image/png, image/jpeg"
                        />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-8 h-full">
                        <div>
                            <Label htmlFor="picture">Facility Name</Label>
                            <Input {...register("name", { required: true })} type="text" placeholder="Facility Name" />
                        </div>
                        <div>
                            <Label htmlFor="location">Location</Label>
                            <Input {...register("location", { required: true })} id="location" type="text" placeholder="Facility Location" />
                        </div>
                        <div>
                            <Label htmlFor="price">Price Per Hour</Label>
                            <Input id="price" {...register("pricePerHour", { required: true })} type="text" placeholder="Facility price per hour" />
                        </div>

                    </div>

                    <div className="my-8">
                        <Label htmlFor="des">Facility Description</Label>
                        <div id="des" className="mt-1">
                            <RichTextEditor value={description} onChange={setDescription} style="h-80" />
                        </div>
                    </div>
                    <div className=" mt-16 flex justify-end">
                        <Button type="submit" className="text-lg">Add</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddFacility;