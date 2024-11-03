/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import { useCreateUserMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import verifyJwtToken from "@/utils/verifyJwtToken";
import { Input } from "@/components/ui/input";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";

type ProfileFormData = {
    name: string;
    email: string;
    phone: string;
    password: string;
    address: string;
    profileImage?: File;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
};

const MyProfile = () => {
    const [createUser] = useCreateUserMutation();
    const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>();
    const [profileImage, setProfileImage] = useState<File | null>(null);

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setProfileImage(event.target.files[0]);
        }
    };

    const onSubmit = async (formData: ProfileFormData) => {
        const signUpData = {
            ...formData,
            profileImage,
            role: "user",
        };
        try {
            const res = await createUser(signUpData).unwrap();
            const user = verifyJwtToken(res.token);
            console.log(user)

        } catch (error) {
            toast.error(`Failed to update profile: ${(error as any).data?.message}`);
        }
    };

    return (
        <div className="py-10">
            <h1 className="gap-8 text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-extrabold mb-10">
                <span className="bg-black text-white px-4 pb-1">My</span> Profile
            </h1>
            <div className="grid md:grid-cols-8 gap-6">
                <section className="w-full col-span-12 lg:col-span-3">
                    <div className="bg-white min-h-[400px] pb-10 p-6  rounded-lg">
                        <Label title="click to choose image" className="flex items-center gap-2 relative cursor-pointer" htmlFor="profileImage">
                            <Avatar className="w-44 h-44">
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
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
                        <div className="mt-5">
                            <h1 className="text-2xl font-bold">Profile Name</h1>
                            <h1 className="text-md">CEO of space X</h1>
                        </div>
                    </div>
                </section>
                <section className="col-span-12 lg:col-span-5">
                    <div className="bg-white w-full min-h-[450px] rounded-lg py-10">
                        <CardContent>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid gap-4">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="flex flex-col space-y-1.5">
                                            <Label className="flex items-center gap-2" htmlFor="name">
                                                Name
                                            </Label>
                                            <Input
                                                {...register("name", { required: "Name is required" })}
                                                id="name"
                                                className="rounded-lg"
                                                placeholder="Your full name"
                                                aria-invalid={errors.name ? "true" : "false"}
                                            />
                                            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label className="flex items-center gap-2" htmlFor="email">
                                                Email
                                            </Label>
                                            <Input
                                                {...register("email", { required: "Email is required" })}
                                                type="email"
                                                id="email"
                                                className="rounded-lg"
                                                placeholder="Your email address"
                                                aria-invalid={errors.email ? "true" : "false"}
                                            />
                                            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                                        </div>
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="flex flex-col space-y-1.5">
                                            <Label className="flex items-center gap-2" htmlFor="phone">
                                                Phone
                                            </Label>
                                            <Input
                                                {...register("phone", { required: "Phone number is required" })}
                                                type="text"
                                                id="phone"
                                                className="rounded-lg"
                                                placeholder="Contact number"
                                                aria-invalid={errors.phone ? "true" : "false"}
                                            />
                                            {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label className="flex items-center gap-2" htmlFor="password">
                                                Password
                                            </Label>
                                            <Input
                                                {...register("password", { required: "Password is required" })}
                                                type="password"
                                                className="rounded-lg"
                                                id="password"
                                                placeholder="Add a strong password"
                                                aria-invalid={errors.password ? "true" : "false"}
                                            />
                                            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                                        </div>
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label className="flex items-center gap-2" htmlFor="address">
                                            Address
                                        </Label>
                                        <Textarea
                                            {...register("address", { required: "Address is required" })}
                                            id="address"
                                            className="rounded-lg"
                                            placeholder="Your address"
                                            aria-invalid={errors.address ? "true" : "false"}
                                        />
                                        {errors.address && <p className="text-red-500">{errors.address.message}</p>}
                                    </div>



                                    {/* Shipping Address Fields */}
                                    <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">Shipping Address</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-primary">Street</label>
                                            <Input
                                                {...register("street", { required: "Street is required" })}
                                                placeholder="Street"
                                                className="w-full mt-1 px-4 bg-slate-50  py-2 border rounded-lg"
                                                aria-invalid={errors.street ? "true" : "false"}
                                            />
                                            {errors.street && <p className="text-red-500">{errors.street.message}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-primary">City</label>
                                            <Input
                                                {...register("city", { required: "City is required" })}
                                                placeholder="City"
                                                className="w-full mt-1 px-4 bg-slate-50  py-2 border rounded-lg"
                                                aria-invalid={errors.city ? "true" : "false"}
                                            />
                                            {errors.city && <p className="text-red-500">{errors.city.message}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-primary">State</label>
                                            <Input
                                                {...register("state", { required: "State is required" })}
                                                placeholder="State"
                                                className="w-full mt-1 px-4 bg-slate-50  py-2 border rounded-lg"
                                                aria-invalid={errors.state ? "true" : "false"}
                                            />
                                            {errors.state && <p className="text-red-500">{errors.state.message}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-primary">Postal Code</label>
                                            <Input
                                                {...register("postalCode", { required: "Postal code is required" })}
                                                placeholder="Postal Code"
                                                className="w-full mt-1 px-4 bg-slate-50  py-2 border rounded-lg"
                                                aria-invalid={errors.postalCode ? "true" : "false"}
                                            />
                                            {errors.postalCode && <p className="text-red-500">{errors.postalCode.message}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-primary">Country</label>
                                            <Input
                                                {...register("country", { required: "Country is required" })}
                                                placeholder="Country"
                                                className="w-full mt-1 px-4 bg-slate-50  py-2 border rounded-lg"
                                                aria-invalid={errors.country ? "true" : "false"}
                                            />
                                            {errors.country && <p className="text-red-500">{errors.country.message}</p>}
                                        </div>
                                    </div>
                                </div>
                                <CardFooter className="p-0 mt-14 flex justify-end">
                                    <Button className="rounded-lg" type="submit">Update Profile</Button>
                                </CardFooter>
                            </form>
                        </CardContent>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MyProfile;
