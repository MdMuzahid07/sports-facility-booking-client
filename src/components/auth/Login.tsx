import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Key, User } from "lucide-react";
import { NavLink } from "react-router-dom";

const Login = () => {
    // const sample = {
    //     "email": "user@gmail.com",
    //     "password": "user123"
    // }


    return (
        <div className="w-screen h-screen bg-cover bg-[url('https://res.cloudinary.com/dymo0iyee/image/upload/v1725725369/2150426501_xar9gl.jpg')]">
            <div className="flex justify-center items-center h-full w-full px-4 xl:px-0">
                <Card className="w-[350px] rounded-none">
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>Enter your username and password</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label className=" flex items-center gap-2" htmlFor="name">
                                        <span><User /></span>
                                        <span>Name</span>
                                    </Label>
                                    <Input id="name" placeholder="Name of your project" />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label className=" flex items-center gap-2" htmlFor="password">
                                        <span><Key /></span>
                                        <span>Password</span>
                                    </Label>
                                    <Input type="password" id="password" placeholder="Name of your project" />
                                </div>
                                <div className="text-slate-600">
                                    <small>New here? <span className="font-bold"><NavLink to="/sign-up">Create Account</NavLink></span></small>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button className="rounded-none">Login</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default Login;