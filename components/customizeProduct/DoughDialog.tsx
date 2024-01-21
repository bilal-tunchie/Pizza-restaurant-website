"use client"

import { useMemo } from "react";
import Image from "next/image";
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import useDough from "@/hooks/useDough";

import samika  from "@/public/images/samika.png";
import rakika  from "@/public/images/rakika.png";
import edgesـcheese  from "@/public/images/edgesـcheese.png";

function DoughDialog() {
    const doughHook = useDough();
    const currentDough = doughHook.dough;

    const image = useMemo(() => {
        if(currentDough === "رقيقة"){
            return rakika
        }else if(currentDough === "اطراف الجبنة"){
            return edgesـcheese
        }
        return samika
    }, [currentDough])

    return (
        <Dialog
            open={doughHook.isOpen}
            onOpenChange={() => doughHook.onClose()}
        >
            <DialogContent>
            <div className="bg-white rounded-2xl p-4">
                <h4 className="text-lg mb-2 text-primary font-semibold">{currentDough}</h4>
                <div>
                    <Image 
                        src={image} 
                        alt="dough Image" 
                        width={300}
                        height={300}
                        className="mx-auto"
                    />
                </div>
            </div>
            </DialogContent>
        </Dialog>
    )
}

export default DoughDialog;