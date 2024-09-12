/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import useImgBBUpload from "@/hooks/useImgBBUpload"
import { useGetASingleFacilityQuery, useUpdateAFacilityMutation } from "@/redux/features/facilities/facilityApi"
import { Label } from "@radix-ui/react-label"
import { memo } from "react"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import { toast } from "sonner"

const UpdateFacility = () => {
    const { facilityId } = useParams();
    const { img, getEvent } = useImgBBUpload();
    const { register, handleSubmit, reset } = useForm();
    const [updateAFacility, { error, data, isLoading }] = useUpdateAFacilityMutation();
    const { data: facilityById } = useGetASingleFacilityQuery(facilityId);

    // console.log({ error, data }, "this console.log from  update facility component")

    if (isLoading) {
        return toast.loading("Please wait", { id: "updateFacilityToastID" })
    };
    if (error) {
        toast.error(`${error?.data?.message}`, { id: "updateFacilityToastID" });
    };
    if (data && data.success) {
        toast.success("Faculty update successfully!", { id: "updateFacilityToastID" });
    }


    const onSubmit = async (updatedData: any) => {
        const facilityData = {
            ...updatedData,
            image: img,
            pricePerHour: Number(updatedData?.pricePerHour) || undefined
        }

        // removing empty string, undefined form the facilityData for the patch update
        // because in mongoose schema all data are required, even though we send empty string
        // or undefined data in the time of patch update , its return the validation error
        // this function to solve this problem 
        // Object.Key return an array of keys from the object
        Object.keys(facilityData).forEach(key => {
            if (facilityData[key] === "" || facilityData[key] === undefined) {
                // deleting from the facilityData object with the key
                delete facilityData[key];
            }
        });

        try {
            const res = await updateAFacility({ id: facilityId, data: facilityData }).unwrap();
            if (res?.success) {
                reset();
            }
        } catch (error) {
            toast.error("Something went wrong!");
        }
    };

    return (
        <div className="py-10">
            <h1 className="gap-8 text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-extrabold">
                Update Facility
            </h1>
            <div className="bg-white p-8 rounded-lg mt-14 min-h-[450px]  relative">
                <form onSubmit={handleSubmit(onSubmit)} className="grid sm:grid-cols-2 gap-8 h-full">
                    <div>
                        <Label htmlFor="picture">Facility Name</Label>
                        <Input {...register("name")} type="text" placeholder={facilityById?.data?.name} />
                    </div>
                    <div>
                        <Label htmlFor="location">Location</Label>
                        <Input {...register("location")} id="location" type="text" placeholder={facilityById?.data?.location} />
                    </div>
                    <div>
                        <Label htmlFor="price">Price Per Hour</Label>
                        <Input id="price" {...register("pricePerHour")} type="text" placeholder={facilityById?.data?.pricePerHour} />
                    </div>
                    <div className="relative">
                        <Label htmlFor="picture">Picture</Label>
                        <Input onChange={getEvent} id="picture" type="file" />
                        <img className="absolute mt-2 w-44 rounded-lg" src={facilityById?.data?.image} alt="" />
                    </div>
                    <div>
                        <Label htmlFor="des">Facility Description</Label>
                        <Textarea {...register("description")} id="des" placeholder={facilityById?.data?.description} />
                    </div>
                    <div className="absolute right-8 bottom-8">
                        <Button type="submit" className="text-lg">Update</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default memo(UpdateFacility);