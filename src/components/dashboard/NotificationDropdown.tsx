/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Bell,
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


import { Button } from "../ui/button";


const notifications = [
    {
        title: "New order placed.",
        description: "1 hour ago",
    },
    {
        title: "Order Cancelled",
        description: "2 hours ago",
    },
]

const NotificationDropdown = () => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="w-10 h-10 bg-slate-200 border rounded-full p-2.5 relative">
                    <span className="absolute right-0 top-0">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                    </span>
                    <Bell className="text-black" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 rounded-lg bg-white bg-opacity-45 backdrop-blur-sm py-6 px-4">
                {notifications?.map((notification, index) => (
                    <div
                        key={index}
                        className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                    >
                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                        <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">
                                {notification.title}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {notification.description}
                            </p>
                        </div>
                    </div>
                ))}
            </DropdownMenuContent>
        </DropdownMenu >
    )
}

export default NotificationDropdown;