"use client"

import { useState} from "react";
import useCart from "@/hooks/use-cart"
import Link from "next/link";
import { SlMagnifier } from "react-icons/sl";
import { FaShoppingCart } from "react-icons/fa";
import { cn } from "@/lib/utils";

import useCartSheet from "@/hooks/useCartSheet"

interface MenuNavProps {
    setIsSearch: (value: boolean) => void
    handleClick: (id: string) => void
}
function MenuNav({ setIsSearch, handleClick }: MenuNavProps) {
    const [isActive, setIsActive] = useState<string>("");
    const cartSheet = useCartSheet();
    const cart = useCart();

    const toggleCartSheet = () => {
        if (cartSheet.isOpen) {
            cartSheet.onClose()
            return;
        }
        cartSheet.onOpen()
    }

    const menuNav = [
        { id: "6ae3460d-6698-4e1e-86d2-f0aa83a7a5c2", value: "بيتزا" },
        { id: "9015df02-7f2e-409d-b4ce-9b647d91b01e", value: "طلبات جانبية" },
        { id: "6595a98a-e5c3-4dd5-8df3-13bb5cf84f6b", value: "حلويات" }, 
        { id: "f2936990-2407-4976-b259-d95a2a0375f3", value: "مشروبات" }
    ];

    const pizzaNav = [
        { id: "6ae3460d-6698-4e1e-86d2-f0aa83a7a5c2", value: "بيانو" },
        { id: "19ee21ac-2a55-4deb-928d-9044483794eb", value: "اختيارات الشيف" },
        { id: "014042e1-d44f-41f6-b8e7-69cb5e0c9c50", value: "بيت الرانشي" },
        { id: "dc640c4c-50db-46d8-8258-14586e8e0565", value: "الأصلية" },
        { id: "55e0739c-69e5-45c6-a0af-a18678806e5a", value: "وجبة طفل" }
    ];

    return (
        <>
            <div className='relative flex justify-between items-center bg-primary p-2 rounded-full gap-2 md:gap-3'>
                <span 
                    className='search text-primary-tint text-sm sm:text-xl cursor-pointer font-light transition-[0.5s] bg-light p-2 rounded-[50%]'
                    onClick={ () => setIsSearch(true)}
                >
                    <SlMagnifier id='open-nav'/>
                </span>
                <div className='inline-flex justify-evenly items-center flex-1 text-white'>
                    <Link href='/offers' className="hover:text-light rounded-lg text-[13px]"> 
                        العروض
                    </Link>
                    {menuNav.map( ({id, value},i) => { 
                        return (
                            <span 
                                key={id+i}
                                className={cn("cursor-pointer rounded-lg text-[13px] hover:bg-white hover:text-primary py-1 px-2 ", 
                                isActive === id && "bg-white text-primary font-bold")}
                                onClick={() =>  {
                                    setIsActive(id)
                                    handleClick(id)
                                }}
                            >
                                {value}
                            </span> 
                        )
                    })}
                    <div 
                        className='2xl:hidden relative cursor-pointer rounded-lg text-xl hover:text-light'
                        onClick={toggleCartSheet} 
                    >
                        <span className="absolute -top-3 -right-3 text-white bg-danger rounded-full w-5 h-5 flex justify-center items-center">{cart?.items.length}</span>
                        <FaShoppingCart/>
                    </div>
                </div>
            </div>
            <div className='mx-auto w-[95%] h-[35px] bg-light flex items-center justify-evenly p-3 rounded-br-2xl rounded-bl-2xl'>
                {pizzaNav.map(({id, value}, i) => ( 
                    <span 
                        key={id+i} 
                        onClick={() => handleClick(id)}
                        className="hover:text-secondary rounded-lg text-primary cursor-pointer text-sm"
                    >
                        {value}
                    </span>
                ))}
            </div>
        </>
    )
}

export default MenuNav;