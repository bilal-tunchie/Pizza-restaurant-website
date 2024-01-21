"use client"

import Image from "next/image"
import ProductCard from "./productCard";
import { IoIosHeart } from "react-icons/io";
import empty_card from "@/public/images/empty_card.png";
import { CartProducts, FavoritesWithSauces } from '@/types';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface SideItemsListProps {
    data: CartProducts[] | FavoritesWithSauces[];
    isFavorite: boolean;
}

function SideItemsList({ data, isFavorite }: SideItemsListProps) {
    let reverseData = data

    if (!isFavorite) {
        reverseData = [...data].reverse()
    }

    if (!data.length) {
        return (
            <>
                {!isFavorite ?
                    <div className="w-full text-center mt-10">
                        <Image 
                            src={empty_card} 
                            alt="empty" 
                            width={80} 
                            height={80}
                            className="mx-auto mb-3"
                        />
                        <p>سلتك فاضية. ما اشتقت للبيتزا؟</p>
                    </div>
                :
                    <div className="w-full text-center mt-10">
                        <div className="bg-secondary mb-3 rounded-full p-2 cursor-pointer w-fit mx-auto" role="button">
                            <IoIosHeart size={38} color="#fff"/>
                        </div>
                        <p>اضف البيتزا للمفضلة الان</p>
                    </div>
                }
            </>
        )
    }

    return (
        <ScrollArea className="h-[calc(100vh-230px)] bg-white">
            <div>
                {reverseData.map(item => (
                    <ProductCard
                        key={item.id}
                        data={item}
                        isFavorite={isFavorite}
                    />
                ))}
            </div>
            <ScrollBar orientation="vertical" />
        </ScrollArea>
    )
}

export default SideItemsList;