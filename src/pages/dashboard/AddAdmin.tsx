import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Key, Mail, Phone, User } from "lucide-react";

const AddAdmin = () => {
    return (
        <div className="py-10">
            <Card className="min-h-[450px] relative">
                <CardHeader>
                    <CardTitle>Add Admin</CardTitle>
                    <CardDescription>Create an admin account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid sm:grid-cols-2 w-full items-center gap-8">
                            <div className="flex flex-col space-y-1.5">
                                <Label className=" flex items-center gap-2" htmlFor="name">
                                    <span><User /></span>
                                    <span>Name</span>
                                </Label>
                                <Input id="name" placeholder="Your full name" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label className=" flex items-center gap-2" htmlFor="email">
                                    <span><Mail /></span>
                                    <span>Email</span>
                                </Label>
                                <Input type="email" id="email" placeholder="Your email address" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label className=" flex items-center gap-2" htmlFor="phone">
                                    <span><Phone /></span>
                                    <span>Phone</span>
                                </Label>
                                <Input type="text" id="phone" placeholder="Contact number" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label className=" flex items-center gap-2" htmlFor="pass">
                                    <span><Key /></span>
                                    <span>Password</span>
                                </Label>
                                <Input type="password" id="pass" placeholder="Add a strong password" />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="absolute bottom-0 right-0">
                    <Button>Create Admin</Button>
                </CardFooter>
            </Card>
        </div>
    )
};

export default AddAdmin;