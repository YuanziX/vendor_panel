import Navbarcomp from "./navbarcomp";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import SignOutButton from "./signoutButton";
import { auth } from "@/auth";
import { ModeToggle } from "./themeChangeButton";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { redirect } from "next/navigation";
import Link from "next/link";
export default async function Navbar(){
    const session = await  auth()
    if(session){
        return <div className="h-16 w-full dark:bg-zinc-900 dark:border-gray-600 fixed border-gray-300 border-b-2 shadow-md mb-2 flex justify-between items-center z-50 bg-white">
        <div className=" flex justify-center items-center">
        <img src="https://utfs.io/f/795065b3-e04f-4d76-9f93-99c13e9673a2-1m0e46.png" className="h-16"></img>
        <div className="text-purple-600 font-bold text-2xl">
            Cheez E Choice
        </div>
        </div>
        <div className="lg:hidden p-5">
        <DropdownMenu >
            <DropdownMenuTrigger>
                <HamburgerMenuIcon></HamburgerMenuIcon>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem >
                    <Link href={'/'}>Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem >
                <Link href={'/menu'}>Menu</Link>
                </DropdownMenuItem>
                <DropdownMenuItem >
                <Link href={'/orders'}>Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem >
                <Link href={'/feedbacks'}>Feedbacks</Link>
                </DropdownMenuItem>
                <DropdownMenuItem >
                    <SignOutButton>S</SignOutButton>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </div>
        <div className="w-1/2 lg:flex hidden justify-around items-center">
            <ModeToggle></ModeToggle>
            <Navbarcomp name="Home" href="/" ></Navbarcomp>
            <Navbarcomp name="Menu" href="/menu" ></Navbarcomp>
            <Navbarcomp name="Orders" href="/orders" ></Navbarcomp>
            <Navbarcomp name="Feedbacks" href="/feedbacks" ></Navbarcomp>            
            <Avatar className="ml-2 h-12 w-12">
            <AvatarImage src={session?.user.image!} />
            <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <SignOutButton></SignOutButton>
        </div>
    </div>
    }
    
}