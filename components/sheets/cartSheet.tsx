"use client"

import useCartSheet from "@/hooks/useCartSheet"
import Sidebar from "../sidebar/sidebar"
import SheetComponent from "./sheet"
import { FavoritesWithSauces } from "@/types"
import { useWindowSize } from 'usehooks-ts'

interface CartSheetProps {
    favorites: FavoritesWithSauces[];
    // bluryImage: string | undefined;
}
function CartSheet({ favorites }: CartSheetProps) {
    const cartSheet = useCartSheet();
    const { width } = useWindowSize();

    if (width >= 1536) {
        return
    }

    return (
        <SheetComponent 
            isOpen={cartSheet.isOpen}
            onClose={() => cartSheet.onClose()}
        >
            <Sidebar favorites={favorites} />
        </SheetComponent>
    )
}

export default CartSheet;