/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUpdateUserInfoMutation } from "@/redux/features/profile/profileApi";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import verifyJwtToken from "@/utils/verifyJwtToken";
import { Textarea } from "@/components/ui/textarea";

type ProfileFormData = {
    name: string;
    email: string;
    phone: string;
    password: string;
    address: string;
    profileImage?: File;
};

const MyProfile = () => {
    const [updateUserInfo, { isLoading, error, data }] = useUpdateUserInfoMutation();
    const { register, handleSubmit } = useForm<ProfileFormData>();
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const user: any = useAppSelector((state) => state.auth.user);
    const userId = user?.id;



    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setProfileImage(file);

            // Create an image preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string); // Set the preview URL
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };

    const onSubmit = async (data: ProfileFormData) => {
        // Prepare FormData object
        const userInfoFormData = new FormData();

        /* This code snippet is creating an `updatedUserInfo` object by filtering out any properties
        that have a falsy value (such as empty strings or null values) from the `data` object. */
        const updatedUserInfo = {
            name: data?.name,
            phone: data?.phone,
            address: data?.address
        };


        const updateUserProfileInfo = Object.fromEntries(
            Object.entries(updatedUserInfo).filter(([_, value]) => value !== "" && value !== null && value !== undefined)
        );

        console.log(updateUserProfileInfo)

        // Append user data (other than the image)
        userInfoFormData.append("data", JSON.stringify(updateUserProfileInfo));

        // Append the profile image if available
        if (profileImage) {
            userInfoFormData.append("file", profileImage);
        }

        try {
            // Send the request with FormData
            const res = await updateUserInfo({ userId, data: userInfoFormData }).unwrap();
            const user = verifyJwtToken(res.token);
            console.log(user);
        } catch (error) {
            console.log(error)
            toast.error((error as any)?.error?.message, { id: "updateProfileInfoToastId" });
        }
    };



    if (isLoading) {
        toast.loading("Updating...", { id: "updateProfileInfoToastId" });
    }

    if (error) {
        toast.error((error as any)?.data?.message, { id: "updateProfileInfoToastId" });
    }

    if (data && data?.success) {
        toast.success("Done", { id: "updateProfileInfoToastId" });
    }


    return (
        <div className="py-10">
            <h1 className="gap-8 text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-extrabold mb-10">
                My Profile
            </h1>
            <div className="grid md:grid-cols-8 gap-6">
                <section className="w-full col-span-12 lg:col-span-3">
                    <div className="bg-white min-h-[400px] pb-10 p-6 rounded-lg">
                        <Label title="click to choose image" className="flex items-center gap-2 relative cursor-pointer" htmlFor="profileImage">
                            <Avatar className="w-44 h-44">
                                {/* Display the selected image preview */}
                                {imagePreview ? (
                                    <AvatarImage src={imagePreview} alt="Profile Image" />
                                ) : (
                                    <AvatarImage src={(user && user?.avatar) ? user?.avatar : "https://github.com/shadcn.png"} alt="@shadcn" />
                                )}
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="absolute bottom-3 text-white bg-primary w-10 h-10 rounded-lg left-[38%] flex justify-center items-center">
                                <Pencil size={20} />
                            </div>
                        </Label>
                        <Input
                            className="rounded-lg hidden"
                            type="file"
                            id="profileImage"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </div>
                </section>
                <section className="col-span-12 lg:col-span-5">
                    <div className="bg-white w-full min-h-[450px] rounded-lg py-10">
                        <section className="p-4 md:p-8">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid gap-4">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="flex flex-col space-y-1.5">
                                            <Label className="flex items-center gap-2" htmlFor="name">Name</Label>
                                            <Input
                                                {...register("name", { required: false })}
                                                id="name"
                                                className="rounded-lg"
                                                type="text"
                                                placeholder="Your full name"
                                            />
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label className="flex items-center gap-2" htmlFor="phone">Phone</Label>
                                            <Input
                                                {...register("phone", { required: false })}
                                                type="text"
                                                id="phone"
                                                className="rounded-lg"
                                                placeholder="Contact number"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label className="flex items-center gap-2" htmlFor="address">Address</Label>
                                        <Textarea
                                            {...register("address", { required: false })}
                                            id="address"
                                            className="rounded-lg"
                                            placeholder="Your address"
                                        />
                                    </div>
                                </div>
                                <CardFooter className="p-0 mt-14 flex justify-end">
                                    <Button className="rounded-lg" type="submit">Update Profile</Button>
                                </CardFooter>
                            </form>
                        </section>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MyProfile;
