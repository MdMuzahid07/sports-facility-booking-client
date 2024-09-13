/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateUserMutation } from "@/redux/features/auth/authApi";
import { Key, Mail, Notebook, Phone, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const AddAdmin = () => {
    const [createUser, { data, error, isLoading }] = useCreateUserMutation();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    if (isLoading) {
        return toast.loading("Please wait", { id: "addNewAdmin" })
    };
    if (error) {
        toast.error(`${(error as any).data?.messages}`, { id: "addNewAdmin" });
    }
    if (!error && data?.success) {
        toast.success(`Admin ${data?.data?.name}, account created successfully`, { id: "addNewAdmin" });
    }

    const onSubmit = async (data: any) => {
        const signUpData = await {
            ...data,
            role: "admin"
        };
        await createUser(signUpData).unwrap();
        reset();
    };



    return (
        <div className="py-10">
            <Card className="min-h-[450px] relative">
                <CardHeader>
                    <CardTitle>Add Admin</CardTitle>
                    <CardDescription>Create an admin account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid sm:grid-cols-2 w-full items-center gap-8">
                            <div className="flex flex-col space-y-1.5">
                                <Label className=" flex items-center gap-2" htmlFor="name">
                                    <span><User /></span>
                                    <span>Name</span>
                                </Label>
                                <Input  {...register("name", { required: true })} id="name" placeholder="Your full name"
                                    aria-invalid={errors.name ? "true" : "false"}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label className=" flex items-center gap-2" htmlFor="email">
                                    <span><Mail /></span>
                                    <span>Email</span>
                                </Label>
                                <Input  {...register("email", { required: true })} type="email" id="email" placeholder="Your email address"
                                    aria-invalid={errors.email ? "true" : "false"}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label className=" flex items-center gap-2" htmlFor="phone">
                                    <span><Phone /></span>
                                    <span>Phone</span>
                                </Label>
                                <Input  {...register("phone", { required: true })} type="text" id="phone" placeholder="Contact number"
                                    aria-invalid={errors.phone ? "true" : "false"}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label className=" flex items-center gap-2" htmlFor="pass">
                                    <span><Key /></span>
                                    <span>Password</span>
                                </Label>
                                <Input  {...register("password", { required: true })} type="password" id="pass" placeholder="Add a strong password"
                                    aria-invalid={errors.password ? "true" : "false"}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label className=" flex items-center gap-2" htmlFor="pass">
                                    <span><Notebook /></span>
                                    <span>Address</span>
                                </Label>
                                <Textarea  {...register("address", { required: true })} id="pass" placeholder="Add a strong password"
                                    aria-invalid={errors.address ? "true" : "false"}
                                />
                            </div>
                        </div>
                        <CardFooter className="absolute bottom-0 right-0">
                            <Button type="submit">Create Admin</Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
};

export default AddAdmin;