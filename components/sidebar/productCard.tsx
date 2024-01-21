"use client"

import Image from "next/image"
import useCart from "@/hooks/use-cart";
import { useMemo, useRef, useState } from "react";

import { toast } from "sonner";
import ProductDetails from "./productDetails";
import Counter from "../Counter";
import { cn, styleToast } from "@/lib/utils";
import { CartProducts, FavoritesWithSauces } from '@/types';

interface ProductCardProps {
    data: CartProducts | FavoritesWithSauces;
    isFavorite: boolean;
}

function ProductCard({ data, isFavorite }: ProductCardProps) {
    // const {
    //     id, name, description, size, image, 
    //     totalPrice, chosenDough, sauces, quantity 
    // } : CartProducts | FavoritesWithSauces = data;
    // const cart = useCart();
    // const preventTwiceToast = useRef(false);
    // const [intialQuantity, setIntialQuantity] = useState(quantity);

    // const onQuantityChange = (value: number) => {
    //     setIntialQuantity(value)
    //     cart.onQuantityChange(id, value);
    // }

    // if (id && intialQuantity === 0 && !preventTwiceToast.current) {
    //     cart.removeItem(id)
    //     preventTwiceToast.current = true;
    //     toast.success("تم حذف المنتج من السلة", { style: styleToast })
    // };

    // const finalTotalPrice = useMemo(() => ( totalPrice * quantity ), [totalPrice, quantity])
    
    return (
        <></>
        // <div className="relative bg-light rounded-[30px] p-5 my-5 mx-3" key={`${id} carts`} dir="rtl">
        //     <div className="flex justify-between gap-4 min-h-[220px]">
        //         <div className="absolute top-2 -left-5 rounded-full">
        //             <Image 
        //                 src={image} 
        //                 alt="product image" 
        //                 width={220}
        //                 height={220}
        //                 className={cn("rounded-2xl", name === "بوكس حفلة الدجاج" && " scale-[0.9]")}
        //             />
        //         </div>
        //         <div className='max-w-[50%] text-sm'>
        //             <h3 className="text-lg mb-4 font-semibold">{name}</h3>
        //             <p>{description}</p>
        //         </div>
        //     </div>
        //     <ProductDetails 
        //         id={id} 
        //         size={size} 
        //         isFavorite={isFavorite} 
        //         chosenDough={chosenDough} 
        //         sauces={sauces} 
        //     />
        //     <div className="flex justify-between items-center mt-10">
        //         <div className="text-xl text-light-contrast font-bold">{finalTotalPrice} ريال</div>
        //         {!isFavorite && 
        //         <Counter 
        //             onChange={(value) => onQuantityChange(value)} 
        //             value={intialQuantity}
        //         />}
        //     </div>
        // </div>
    )
}

export default ProductCard;