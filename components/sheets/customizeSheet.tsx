"use client"

import useCustomizeSheet from "@/hooks/useCustomizeSheet"
import SheetComponent from "./sheet"
import CustomizeClient from "../customizeProduct/customizeClient";
import { FavoritesWithSauces } from "@/types"

interface CustomizeSheetProps {
    favorites: FavoritesWithSauces[];
    bluryImage: string | undefined;
}

function CustomizeSheet({ favorites, bluryImage }: CustomizeSheetProps) {
    const customizeSheet = useCustomizeSheet();

    return (
        <SheetComponent 
            isOpen={customizeSheet.isOpen}
            onClose={() => customizeSheet.onClose()}
        >
            <CustomizeClient favorites={favorites} bluryImage={bluryImage}/>
        </SheetComponent>
    )
}

export default CustomizeSheet;