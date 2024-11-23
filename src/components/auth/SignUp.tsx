/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Key, Mail, Notebook, Phone, User } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCreateUserMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import verifyJwtToken from "@/utils/verifyJwtToken";
import { Textarea } from "../ui/textarea";

const SignUp = () => {
    const [createUser, { data, error, isLoading }] = useCreateUserMutation();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();


    if (isLoading) {
        return toast.loading("Please wait", { id: "signUpUser" })
    };
    if (error) {
        toast.error(`${(error as any).data?.message}`, { id: "signUpUser" });
    }
    if (!error && data?.success) {
        toast.success(`Welcome ${data?.data?.name}, account created successfully`, { id: "signUpUser" });
    }

    const onSubmit = async (data: any) => {
        const signUpData = await {
            ...data,
            role: "user",
        };
        const res = await createUser(signUpData).unwrap();
        const user = verifyJwtToken(res?.token);
        if (res && user) {
            dispatch(setUser({
                user: { ...user, id: res?.data?._id },
                token: res?.token,
            }));
        }
        if (res.success) {
            navigate("/")
        }
    };

    return (
        <div className="w-screen h-screen bg-cover bg-[url('https://res.cloudinary.com/dymo0iyee/image/upload/v1725725367/2151418404_a6xy98.jpg')]">
            <div className="flex justify-center items-center h-full w-full px-4 xl:px-0">
                <Card className="max-w-xl w-full rounded-none">
                    <CardHeader>
                        <CardTitle>Sign Up</CardTitle>
                        <CardDescription>Create your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid w-full items-center gap-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label className=" flex items-center gap-2" htmlFor="name">
                                            <span><User /></span>
                                            <span>Name</span>
                                        </Label>
                                        <Input
                                            {...register("name", { required: true })}
                                            className="rounded-none"
                                            id="name"
                                            placeholder="Your full name"
                                            aria-invalid={errors.name ? "true" : "false"}
                                        />

                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label className=" flex items-center gap-2" htmlFor="email">
                                            <span><Mail /></span>
                                            <span>Email</span>
                                        </Label>
                                        <Input
                                            {...register("email", { required: true })}
                                            type="email" className="rounded-none" id="email" placeholder="Your email address"
                                            aria-invalid={errors.email ? "true" : "false"}
                                        />
                                    </div>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label className=" flex items-center gap-2" htmlFor="phone">
                                            <span><Phone /></span>
                                            <span>Phone</span>
                                        </Label>
                                        <Input {...register("phone", { required: true })} type="text" className="rounded-none" id="phone" placeholder="Contact number"
                                            aria-invalid={errors.phone ? "true" : "false"}
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label className=" flex items-center gap-2" htmlFor="pass">
                                            <span><Key /></span>
                                            <span>Password</span>
                                        </Label>
                                        <Input {...register("password", { required: true })} type="password" className="rounded-none" id="pass" placeholder="Add a strong password"
                                            aria-invalid={errors.password ? "true" : "false"}
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label className=" flex items-center gap-2" htmlFor="pass">
                                            <span><Notebook /></span>
                                            <span>Address</span>
                                        </Label>
                                        <Textarea {...register("address", { required: true })} className="rounded-none" id="pass" placeholder="Add a strong password"
                                            aria-invalid={errors.address ? "true" : "false"}
                                        />
                                    </div>
                                </div>
                                <div className="text-slate-600">
                                    <small>Have account? <span className="font-bold"><NavLink to="/login">Login</NavLink></span></small>
                                </div>
                            </div>
                            <CardFooter className="flex justify-end">
                                <Button className="rounded-none">Sign Up</Button>
                            </CardFooter>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default SignUp;