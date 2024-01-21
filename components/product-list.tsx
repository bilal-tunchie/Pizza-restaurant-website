"use client"

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Leaf, Plus, Popcorn } from "lucide-react";
import { FaPepperHot } from "react-icons/fa";
import ClientOnly from "./ClientOnly";
import useCustomizeSheet from "@/hooks/useCustomizeSheet"

import Image from "next/image";
import { useWindowSize } from 'usehooks-ts'
import { ProductWithFlavours } from "@/types";

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

    function getIcon(value: string){
        switch (value) {
            case "envira":
                return <Leaf size={20}/> 
            case "salt":
                return <Popcorn size={20}/>
            case "hot":
                return <FaPepperHot size={20}/> 
            default:
                return "NEW"
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
                            item?.backgroundColor
                            )}
                            key={item?.id} 
                            style={{ transform: moveDown}}  
                            ref={refs[item.id]} 
                            onClick={() => onCustomizeProduct(item.id)}
                        >
                            <span 
                                className='shadow-[rgba(0,0,0,0.2)_0px_12px_28px_0px,rgba(0,0,0,0.1)_0px_2px_4px_0px,rgba(255,255,255,0.05)_0px_0px_0px_1px_inset] absolute -left-[15px] bottom-[20%] flex items-center bg-white z-[10] text-medium  p-2.5 rounded-[50%]'
                            >
                                {<Plus size={30}/>}
                            </span> 
                            <div className=' text-white flex flex-col gap-4 text-bold flex-1 text-sm max-w-[170px]'>
                                <h4 className="text-lg">{item.name}</h4>
                                <p>{item.description}</p>
                                <div className="mt-auto flex gap-2">
                                    {item.flavours.map( (fav, i) => (
                                        <div 
                                            key={i}
                                            className={cn(`bg-medium text-white rounded-full 
                                            w-10 h-10 flex justify-center items-center text-[12px]`,
                                            fav.flavour && fav.color,
                                            )}
                                        >
                                            {getIcon(fav.flavour)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div 
                                className={cn("absolute -top-8 -left-8", 
                                item.name === "بوكس حفلة الدجاج" && "scale-75")}
                            >
                                <Image 
                                    src={item.image} 
                                    alt="" 
                                    width={192}
                                    height={192}
                                    placeholder="blur"
                                    blurDataURL={bluryImage}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        </ClientOnly>
    )
}











// item?.backgroundColor === "bg-tertiary" && "bg-tertiary",
// item?.backgroundColor === "bg-primary" && "bg-primary",
// item?.backgroundColor === "bg-secondary-tint" && "bg-secondary-tint",

// fav.flavour === "hot" && "bg-danger",
// fav.flavour === "envira" && "bg-envira",
// fav.flavour === "salt" && "bg-salt",
// fav.flavour === "light-shade" && "bg-light-shade",