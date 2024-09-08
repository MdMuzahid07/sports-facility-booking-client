import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Key, Mail, Notebook, Phone, User } from "lucide-react";
import { NavLink } from "react-router-dom";

const SignUp = () => {

    // const sample = {
    //     "name": "Programming Hero",
    //     "email": "user123@gmail.com",
    //     "password": "user123",
    //     "phone": "01322901105",
    //     "role": "user",
    //     "address": "Level-4, 34, Awal Centre, Banani, Dhaka"
    // }


    return (
        <div className="w-screen h-screen bg-cover bg-[url('https://res.cloudinary.com/dymo0iyee/image/upload/v1725725367/2151418404_a6xy98.jpg')]">
            <div className="flex justify-center items-center h-full w-full px-4 xl:px-0">
                <Card className="max-w-xl w-full rounded-none">
                    <CardHeader>
                        <CardTitle>Sign Up</CardTitle>
                        <CardDescription>Create your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label className=" flex items-center gap-2" htmlFor="name">
                                            <span><User /></span>
                                            <span>Name</span>
                                        </Label>
                                        <Input className="rounded-none" id="name" placeholder="Your full name" />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label className=" flex items-center gap-2" htmlFor="email">
                                            <span><Mail /></span>
                                            <span>Email</span>
                                        </Label>
                                        <Input type="email" className="rounded-none" id="email" placeholder="Your email address" />
                                    </div>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label className=" flex items-center gap-2" htmlFor="phone">
                                            <span><Phone /></span>
                                            <span>Phone</span>
                                        </Label>
                                        <Input type="text" className="rounded-none" id="phone" placeholder="Contact number" />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label className=" flex items-center gap-2" htmlFor="pass">
                                            <span><Key /></span>
                                            <span>Password</span>
                                        </Label>
                                        <Input type="password" className="rounded-none" id="pass" placeholder="Add a strong password" />
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label className=" flex items-center gap-2" htmlFor="address">
                                        <span><Notebook /></span>
                                        <span>Address</span>
                                    </Label>
                                    <Input className="rounded-none" type="text" id="address" placeholder="Your address" />
                                </div>
                                <div className="text-slate-600">
                                    <small>Have account? <span className="font-bold"><NavLink to="/login">Login</NavLink></span></small>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button className="rounded-none">Sign Up</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default SignUp;