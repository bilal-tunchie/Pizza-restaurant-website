"use client"

import { useCallback, useState, useRef } from "react";
import { useOnClickOutside } from 'usehooks-ts'

import Logo from "./logo";
import UserMenu from "./user-menu";
import MenuToggle from "./menu-toggle";

export default function Navbar(){

    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const handleClickOutside = () => setIsOpen(false)

    useOnClickOutside(ref, handleClickOutside)

    return (
        <nav className="fixed top-0 right-2 md:right-4 2xl:w-[73.6%] w-[calc(100%_-_15px)] lg:w-[calc(100%_-_28px)] z-[30] bg-white py-3.5 pl-2 mb-2">
            <div className="flex items-center justify-between w-full">
                <Logo/>
                <div className="relative" ref={ref}>
                    <MenuToggle onToggleOpen={toggleOpen}/>
                    <div className="hidden lg:flex justify-between min-w-[500px] text-md">
                        <UserMenu />
                    </div>
                    {isOpen &&  <div 
                        className="lg:hidden absolute rounded-xl w-[300px] bg-white overflow-hidden
                        shadow-[15px_15px_30px_rgba(0,0,0,0.1),-15px_-15px_30px_rgba(0,0,0,0.1)] left-0 top-12 text-sm p-2"
                    >
                        <UserMenu setIsOpen={setIsOpen}/>
                    </div>}
                </div>
            </div>
        </nav>
    )
}