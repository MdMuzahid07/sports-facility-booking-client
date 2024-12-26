/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    LogOut,
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toast } from "sonner";

const UserDropdownDashboard = () => {
    const user: any = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        const proceed = window.confirm("logout?")
        if (proceed) {
            navigate("/");
            dispatch(logout());
            toast.success("logout successfully");
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2">
                    <div className="text-right leading-3">
                        <h3 className="text-md leading-6">{user?.email?.split(".")[0]}</h3>
                        <span className="text-sm">{user?.role}</span>
                    </div>
                    <Avatar>
                        <AvatarImage className="w-10 h-10 cursor-pointer rounded-full overflow-hidden object-cover object-center" src={(user && user.avatar) ? user?.avatar : "https://github.com/shadcn.png"} alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-lg bg-white bg-opacity-45 backdrop-blur-sm py-4">
                <DropdownMenuLabel>
                    <span className="text-xl">Hello, </span>
                    <br />
                    <span className="text-xs">{user?.email}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* <DropdownMenuGroup>
                    <NavLink to="/">
                        <DropdownMenuItem>
                            <Home className="mr-2 h-4 w-4" />
                            <span>Home</span>
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </NavLink>
                </DropdownMenuGroup> */}
                <DropdownMenuSeparator />
                {/* <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup> */}
                <DropdownMenuSeparator />
                <NavLink to="/">
                    <DropdownMenuItem onClick={handleLogout} >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </NavLink>
            </DropdownMenuContent>
        </DropdownMenu >
    )
}

export default UserDropdownDashboard;