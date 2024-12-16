/* eslint-disable @typescript-eslint/no-explicit-any */
import RichTextEditor from "@/components/richTextEditor/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetASingleFacilityQuery, useUpdateAFacilityMutation } from "@/redux/features/facilities/facilityApi";
import MultipleImageSelector from "@/utils/MultipleImageSelector";
import { Label } from "@radix-ui/react-label";
import { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";




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






const UpdateFacility = () => {
    const { facilityId } = useParams();
    const { register, handleSubmit, reset } = useForm();
    const [updateAFacility, { error, data, isLoading }] = useUpdateAFacilityMutation();
    const { data: facilityById } = useGetASingleFacilityQuery(facilityId);
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
        console.log(error)
        toast.error(`${(error as any).data?.message}`, { id: "createFacility" });
    };
    if (data && data.success) {
        toast.success("Faculty created successfully!", { id: "createFacility" });
    };


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
        };

        const updateFacilityData = cleanEmptyOrNullValuesForPartialUpdate(facilityData);

        submitData.append("data", JSON.stringify(updateFacilityData));

        try {
            const res = await updateAFacility({ id: facilityId, data: submitData }).unwrap();
            if (res?.success) {
                reset();
            }
            reset();
            setDescription("");
            setSelectedImages([]);
        } catch (error) {
            console.log(error, "error from try catch");
        }
    };



    return (
        <div className="py-10">
            <h1 className="gap-8 text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-extrabold">
                Update Facility
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
                    {
                        !(selectedImages?.length > 0) && (
                            <>
                                <h1 className="text-xl mb-2">Current Images</h1>

                                <div className="flex flex-wrap gap-8 mb-7">
                                    {
                                        facilityById?.data?.image?.map((img: string, index: number) => {
                                            return (
                                                <img key={index} className="w-44 h-28 object-cover object-center rounded-lg" src={img} alt="" />
                                            )
                                        })
                                    }
                                </div>
                            </>
                        )
                    }
                    <div className="grid sm:grid-cols-2 gap-8 h-full">
                        <div>
                            <Label htmlFor="picture">Facility Name</Label>
                            <Input {...register("name", { required: false })} type="text" placeholder={facilityById?.data?.name} />
                        </div>
                        <div>
                            <Label htmlFor="location">Location</Label>
                            <Input {...register("location", { required: false })} id="location" type="text" placeholder={facilityById?.data?.location} />
                        </div>
                        <div>
                            <Label htmlFor="price">Price Per Hour</Label>
                            <Input id="price" {...register("pricePerHour", { required: false })} type="text" placeholder={facilityById?.data?.pricePerHour} />
                        </div>

                    </div>

                    <div className="my-8">
                        <Label htmlFor="des">Facility Description</Label>
                        <div id="des" className="mt-1">
                            <RichTextEditor
                                value={description ? description : facilityById?.data?.description}
                                onChange={setDescription}
                                style="h-80"
                            />
                        </div>
                    </div>
                    <div className=" mt-16 flex justify-end">
                        <Button type="submit" className="text-lg">Save</Button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default memo(UpdateFacility);