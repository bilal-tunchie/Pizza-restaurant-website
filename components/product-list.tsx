"use client"

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import ClientOnly from "./ClientOnly";
import useCustomizeSheet from "@/hooks/useCustomizeSheet"

import { useWindowSize } from 'usehooks-ts'
import { ProductWithFlavours } from "@/types";
import ProductItem from "./productItem";

interface ProductListProps {
    filterData: ProductWithFlavours[];
    data: ProductWithFlavours[];
    refs: { [key: string]: React.RefObject<HTMLDivElement> }
    bluryImage: string | undefined
}
export default function ProductList({ filterData, data, refs, bluryImage }: ProductListProps) {

    const customizeSheet = useCustomizeSheet();
    const isSameLength = filterData.length === data.length;
    const { width } = useWindowSize();
    const screenSize = useMemo(() => width > 1280, [width]);

    const onCustomizeProduct = (id: string) => {
        const productToBeCustomized = data.find(item => item.id === id);
        
        if (productToBeCustomized) {
            customizeSheet.onDataChange(productToBeCustomized);
            customizeSheet.onOpen()
        }
    }

    return (
        <ClientOnly>
            <div className='relative flex justify-center flex-wrap gap-[40px_20px] translate-y-14 px-2 md:px-4 pb-52 mt-7' >
                {isSameLength && screenSize  && <div 
                    className="flex items-center justify-center absolute w-[250px] h-[50px] max-h-20
                    bg-light shadow-[0_3px_12px_#0003] rounded-full" 
                >
                    <h3 className="pizza-intro"> بيتزا، تصنع يومك !</h3>
                </div>} 
                {filterData?.map( (item, i) => {
                    let moveDown;

                    if (isSameLength && screenSize) {
                        if (i % 3 === 1 || i === filterData.length - 1 ) { 
                            moveDown = 'translateY(100px)'
                        }
                    }

                    return (
                        <div 
                            className={cn(`relative flex justify-between gap-4 w-[85%] md:w-[calc(45%_-_30px)] 
                                lg:w-[calc(32%_-_30px)] min-h-[200px] 
                                shadow-[0_6px_17px_#0003] cursor-pointer p-4 rounded-[15px] mx-auto`,
                                item?.backgroundColor === "bg-tertiary" && "bg-tertiary",
                                item?.backgroundColor === "bg-primary" && "bg-primary",
                                item?.backgroundColor === "bg-secondary-tint" && "bg-secondary-tint",
                            )}
                            key={item?.id} 
                            style={{ transform: moveDown}}  
                            ref={refs[item.id]} 
                            onClick={() => onCustomizeProduct(item.id)}
                        >
                            <ProductItem item={item} bluryImage={bluryImage} />
                        </div>
                    )
                })}
            </div>
        </ClientOnly>
    )
}