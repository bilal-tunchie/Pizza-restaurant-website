"use client"

import useFavorite from "@/hooks/useFavorite"
import { IoIosHeart } from "react-icons/io";
import { ProductWithFlavours } from "@/types";
import { FavoritesWithSauces } from "@/types"

interface HeartButtonProps {
    data: ProductWithFlavours;
    favorites: FavoritesWithSauces[]
    size: string;
    dough: string;
    sauces: {label: string, quantity: number, image: string}[];
    totalPrice: number;
}

function HeartButton({ data, favorites, size, dough, sauces, totalPrice }: HeartButtonProps) {

    const { toggleFavorite, hasFavorited } = useFavorite({
        ...data, 
        size: data.sizes ? size : " ",
        chosenDough: data.dough ? dough : " ",
        sauces: sauces.filter(sauce => sauce.quantity > 0),
        totalPrice
    }, favorites);

    return (
        <div className="flex items-center gap-5 mt-10">
            <div 
                className="border-2 border-primary rounded-full p-2 cursor-pointer w-fit" 
                role="button"
                onClick={toggleFavorite}
            >
                <IoIosHeart size={38} color={hasFavorited.isEqual ? "#245c4e" : "#fff"} />
            </div>
            <h5 className="text-md font-medium">{hasFavorited.isEqual ? "احذفها من المفضلة" : "إضافة للمفضلة "}</h5>
        </div>
    )
}

export default HeartButton;