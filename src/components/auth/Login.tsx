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
import verifyJwtToken from "@/utils/verifyJwtToken";

const Login = () => {
    const [loginUser, { data, error, isLoading }] = useLoginUserMutation();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // Pre-set credentials
    const adminCredentials = { email: "mdmuzahid.dev@gmail.com", password: "admin123" };
    const userCredentials = { email: "user@example.com", password: "user123" };


    if (isLoading) {
        toast.loading("Please wait", { id: "loginUser" });
    }
    if (error) {
        toast.error(`${(error as any).data?.messages}`, { id: "loginUser" });
    }
    if (!error && data?.success) {
        toast.success(`Welcome back ${data?.data?.name ? data?.data?.name : "Login failed, please try again!"}, login successfully`, { id: "loginUser" });
    }

    const onSubmit = async (formData: any) => {
        const login = { ...formData };
        const res = await loginUser(login).unwrap();
        const user = verifyJwtToken(res?.token);
        if (res && user) {
            dispatch(setUser({
                user: { ...user, id: res?.data?._id },
                token: res?.token,
            }));
        }
        if (res.success) {
            navigate("/");
        }
    };

    //! for test purpose
    const handleSetCredentials = (role: "admin" | "user") => {
        const credentials = role === "admin" ? adminCredentials : userCredentials;
        setValue("email", credentials.email);
        setValue("password", credentials.password);
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
                                    <Label className="flex items-center gap-2" htmlFor="email">
                                        <span><User /></span>
                                        <span>Email</span>
                                    </Label>
                                    <Input
                                        {...register("email", { required: true })}
                                        id="email"
                                        placeholder="Your account email address"
                                        aria-invalid={errors.name ? "true" : "false"}
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label className="flex items-center gap-2" htmlFor="password">
                                        <span><Key /></span>
                                        <span>Password</span>
                                    </Label>
                                    <Input
                                        {...register("password", { required: true })}
                                        type="password"
                                        id="password"
                                        placeholder="Your password"
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
                        <section className="border-t">
                            <h1 className="text-xl mb-2 ">For test purpose</h1>
                            <div className="flex justify-between">
                                <Button onClick={() => handleSetCredentials("admin")} className="rounded-none">Login as Admin</Button>
                                <Button onClick={() => handleSetCredentials("user")} className="rounded-none">Login as User</Button>
                            </div>
                        </section>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Login;
