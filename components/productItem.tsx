import Image from 'next/image';
import { Plus } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Leaf, Popcorn } from "lucide-react";
import { FaPepperHot } from "react-icons/fa";
import { ProductWithFlavours } from "@/types";

interface ProductItemProps {
    item: ProductWithFlavours;
    bluryImage: string | undefined;
}

function ProductItem({ item, bluryImage } : ProductItemProps) {

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
        <>
            <span
                className='shadow-[rgba(0,0,0,0.2)_0px_12px_28px_0px,rgba(0,0,0,0.1)_0px_2px_4px_0px,rgba(255,255,255,0.05)_0px_0px_0px_1px_inset] absolute -left-[15px] bottom-[20%] flex items-center bg-white z-[10] text-medium  p-2.5 rounded-[50%]'
            >
                {<Plus size={30} />}
            </span>
            <div className=' text-white flex flex-col gap-4 text-bold flex-1 text-[13px] sm:text-sm max-w-[130px] sm:max-w-[170px]'>
                <h4 className="text-lg">{item.name}</h4>
                <p>{item.description}</p>
                <div className="mt-auto flex gap-2">
                    {item.flavours.map((fav, i) => (
                        <div
                            key={i}
                            className={cn(`bg-medium text-white rounded-full 
                                w-10 h-10 flex justify-center items-center text-[12px]`,
                                fav.flavour === "hot" && "bg-danger",
                                fav.flavour === "envira" && "bg-envira",
                                fav.flavour === "salt" && "bg-salt",
                                fav.flavour === "light-shade" && "bg-light-shade",
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
        </>
    )
}

export default ProductItem;