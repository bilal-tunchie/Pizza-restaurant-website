"use client"

import { useMemo, useState, createRef, useRef } from "react";
import { ProductWithFlavours } from "@/types";
import { useEventListener } from 'usehooks-ts'

import { cn } from "@/lib/utils";
import ProductList from "@/components/product-list";
import MenuNav from "./MenuNav";
import MenuSearch from "./MenuSearch";

interface ProductListProps {
    data: ProductWithFlavours[];
    bluryImage: string | undefined;
}
interface Refs {
    [key: string]: React.RefObject<HTMLDivElement>;
}
function MenuNavWrapper({ data,  bluryImage}: ProductListProps) {
    const [isSearch, setIsSearch] = useState<boolean>(false)
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isSticky, setIsSticky] = useState<boolean>(false);
    const productNav = useRef<HTMLDivElement>(null);

    const filterData = useMemo(() => {
        return data?.filter(pizza => pizza?.name.includes(searchTerm))
    }, [data, searchTerm])

    const refs: Refs = data.reduce((acc, value: ProductWithFlavours) => {
        acc[value.id] = createRef();
        return acc;
    }, {} as Refs);

    const handleClick = (id: string) => {
        const currentRef = refs[id]?.current;
        if (refs && currentRef) {
            currentRef.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    };
    const handleScroll = () => {
        if (productNav.current) {
            const offset = productNav.current.getBoundingClientRect().top;
            setIsSticky(offset === 78); 
        }
    };
    
    useEventListener('scroll', handleScroll);

    return (
        <>
            <div 
                className={cn("bg-white h-[108px] transition-all duration-[0.3s] ease-[ease] translate-y-14 sticky top-[22px] z-[20] px-2 md:px-4", 
                isSticky && "shadow-[rgba(0,0,0,0.45)_0px_25px_20px_-20px]")}
                ref={productNav}
            >
                <div>
                    {!isSearch ?
                        <MenuNav
                            setIsSearch={setIsSearch}
                            handleClick={handleClick}
                        />
                        :
                        <MenuSearch
                            setIsSearch={setIsSearch}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                        />
                    }
                </div>
            </div>
            <ProductList filterData={filterData} data={data} refs={refs} bluryImage={bluryImage}/>
        </>
    )
}

export default MenuNavWrapper;