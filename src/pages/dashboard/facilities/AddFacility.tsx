/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import useImgBBUpload from "@/hooks/useImgBBUpload"
import { useCreateFacilityMutation } from "@/redux/features/facilities/facilityApi"
import { Label } from "@radix-ui/react-label"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const AddFacility = () => {
    const { img, getEvent, loaded } = useImgBBUpload();
    const { register, handleSubmit, reset } = useForm();
    const [AddFacility, { error, data, isLoading }] = useCreateFacilityMutation();

    if (isLoading) {
        return toast.loading("Please wait", { id: "createFacility" })
    };
    if (error) {
        toast.error(`${error?.data?.message}`, { id: "createFacility" });
    };
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
                <form onSubmit={handleSubmit(onSubmit)} className="grid sm:grid-cols-2 gap-8 h-full">
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
                    <div>
                        <Label htmlFor="picture">Picture</Label>
                        <Input onChange={getEvent} id="picture" type="file" />
                    </div>
                    <div>
                        <Label htmlFor="des">Facility Description</Label>
                        <Textarea {...register("description", { required: true })} id="des" placeholder="write here " />
                    </div>
                    <div className="absolute right-8 bottom-8">
                        <Button type="submit" className="text-lg">Add</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddFacility