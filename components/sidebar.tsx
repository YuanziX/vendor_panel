"use client"
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Button } from "./ui/button";
import link from "next/link";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import Sidebarbutton from "./sidebar_button";

export default function Sidebar() {
    const pathname = usePathname();
    return (
        <aside className="h-screen w-[300px]  shadow-sm fixed bg-white   border-r-2 border-gray-300 ">
                <img src="https://utfs.io/f/380742ff-14cc-4f18-8c5b-ac0be901b9a3-1tpn4o.jpg" className=""></img>
                <div className="flex items-center justify-center p-5 border-b-2 border-gray-300">
      <Label htmlFor="airplane-mode" className="mx-6 text-xl">Open store</Label>
      <Switch id="airplane-mode" />
    </div>
            <div className="flex flex-col
              w-full gap-2 ">
                <Sidebarbutton href="/products" button="Products"></Sidebarbutton>
                <Sidebarbutton href="/orders" button="Orders"></Sidebarbutton>
                <Sidebarbutton href="/feedbacks" button="Feedbacks"></Sidebarbutton>
                <Sidebarbutton href="/categories" button="Analytics"></Sidebarbutton>                
            </div>
            
        </aside>
    );
}