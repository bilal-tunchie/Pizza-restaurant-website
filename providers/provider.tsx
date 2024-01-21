"use client"

import CartSheet from '@/components/sheets/cartSheet';
import CustomizeSheet from '@/components/sheets/customizeSheet';
import DoughDialog from '@/components/customizeProduct/DoughDialog';
import { Toaster } from "@/components/ui/sonner";
import { FavoritesWithSauces } from "@/types"

const style = { 
    fontSize: "20px", 
    width: "350px" 
}

interface CartSheetProps {
    favorites: FavoritesWithSauces[];
    bluryImage: string | undefined;
}

function Provider({ favorites, bluryImage }: CartSheetProps) {

    return (
        <>
            <CartSheet favorites={favorites} />
            <CustomizeSheet favorites={favorites} bluryImage={bluryImage} />
            <DoughDialog />
            <Toaster richColors dir="rtl" toastOptions={{ style }}/>
        </>
    )
}

export default Provider;