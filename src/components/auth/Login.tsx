/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Key, User } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useLoginUserMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";

const Login = () => {
    const [loginUser, { data, error, isLoading }] = useLoginUserMutation();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();


    if (isLoading) {
        return toast.loading("Please wait", { id: "loginUser" })
    };
    if (error) {
        toast.error("Login failed, please try again!", { id: "loginUser" });
    };
    if (!error && data?.success) {
        toast.success(`Welcome back ${data?.data?.name}, login successfully`, { id: "loginUser" });
        dispatch(setUser({
            user: data?.data?._id,
            userEmail: data?.data?.email,
            role: data?.data?.role,
        }))
        navigate("/");
    };

    const onSubmit = async (data: any) => {
        const login = await {
            ...data,
        };
        loginUser(login);
    };

    return (
        <div className="w-screen h-screen bg-cover bg-[url('https://res.cloudinary.com/dymo0iyee/image/upload/v1725725369/2150426501_xar9gl.jpg')]">
            <div className="flex justify-center items-center h-full w-full px-4 xl:px-0">
                <Card className="w-[350px] rounded-none">
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>Enter your username and password</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label className=" flex items-center gap-2" htmlFor="email">
                                        <span><User /></span>
                                        <span>Email</span>
                                    </Label>
                                    <Input
                                        {...register("email", { required: true })}
                                        id="email" placeholder="your account email address"
                                        aria-invalid={errors.name ? "true" : "false"}
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label className=" flex items-center gap-2" htmlFor="password">
                                        <span><Key /></span>
                                        <span>Password</span>
                                    </Label>
                                    <Input
                                        {...register("password", { required: true })}
                                        type="password" id="password" placeholder="Name of your project"
                                        aria-invalid={errors.password ? "true" : "false"}
                                    />
                                </div>
                                <div className="text-slate-600">
                                    <small>New here? <span className="font-bold"><NavLink to="/sign-up">Create Account</NavLink></span></small>
                                </div>
                            </div>
                            <CardFooter className="flex justify-end">
                                <Button type="submit" className="rounded-none">Login</Button>
                            </CardFooter>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Login;