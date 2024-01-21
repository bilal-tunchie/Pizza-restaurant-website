"use client"

import { useMemo, useState } from "react"
import useCart from "@/hooks/use-cart";
import useCustomizeSheet from "@/hooks/useCustomizeSheet"
import RadioInput from "./radioInput"
import CloseSheet from "../closeSheet";
import DoughPicker from "./doughPicker";
import HeartButton from "../HeartButton";
import CustomizeInfo from "./customizeInfo";
import SidebarButton from "../sidebar/sidebarButton"
import { ScrollArea } from "@/components/ui/scroll-area"
import SaucePicker, { initialSauces } from "./saucePicker";
import { toast } from "sonner";
import { styleToast } from "@/lib/utils"
import { ProductWithFlavours, FavoritesWithSauces } from "@/types";

interface CustomizeClientProps {
    favorites: FavoritesWithSauces[];
    bluryImage: string | undefined;
}

const sizes = ["كبيرة", "وسط", "صغيرة"];

function CustomizeClient({ favorites, bluryImage }: CustomizeClientProps) {
    const cart = useCart();
    const customizeSheet = useCustomizeSheet();
    const data = customizeSheet.data as ProductWithFlavours;
    
    const [size, setSize] = useState("كبيرة")
    const [dough, setDough] = useState("سميكة")
    const [sauces, setSauces] = useState<{label: string, quantity: number, image: string}[]>(initialSauces)
    
    const price: number = useMemo(() => {
        if (size === "وسط") {
            return 29
        }else if(size === "صغيرة") {
            return 19
        }
        
        return data.price
    },[data.price, size])
    
    const totalSaucesQuantity: number = useMemo(() => {
        return sauces.reduce((total, sauce) => total + sauce.quantity, 0)
    },[sauces])
    
    const totalPrice: number = useMemo(() => {
        if (totalSaucesQuantity > 0) {
            return price + (totalSaucesQuantity * 4)
        }
        
        return price
    },[price, totalSaucesQuantity])
    
    const addToCart = () => {
        if (data && size && dough && sauces && totalPrice) {
            cart.addItem({
                id: crypto.randomUUID(),
                name: data.name,
                description: data.description,
                image: data.image,
                backgroundColor: data.backgroundColor,
                price: data.price,
                quantity: 1,
                size: data.sizes ? size : " ",
                chosenDough: data.dough ? dough : " ",
                sauces: sauces.filter(sauce => sauce.quantity > 0),
                totalPrice,
            })
        }
        toast.success(` تم اضافة  "${data.name}" الى السلة`, { style: styleToast })
        customizeSheet.onClose();
    }

    return (
        <div className="bg-light h-full">
            <div className="flex justify-between mx-auto w-full mt-1 py-3 px-4 shadow-[0_6px_17px_#0003]">
                <h2 className="text-xl text-primary font-semibold underline ">
                    تعديل الطلب
                </h2>
                <CloseSheet 
                    onClick={() => customizeSheet.onClose()}
                    className="w-7 p-1 m-0"
                />
            </div>
            <ScrollArea className="h-[calc(100vh-140px)] px-4 mt-2" dir="rtl">
                <CustomizeInfo data={data} bluryImage={bluryImage}/>
                {data.sizes && <div>
                    <h3 className="mt-4 text-lg font-semibold">الحجم</h3>
                    <RadioInput 
                        value={size}
                        items={sizes} 
                        onChange={(value) => setSize(value)}
                        className="flex gap-5 mt-5"
                    />
                </div>}
                <DoughPicker 
                    data={data}
                    dough={dough}
                    setDough={setDough}
                />
                <SaucePicker 
                    data={data} 
                    sauces={sauces} 
                    setSauces={setSauces} 
                    totalSaucesQuantity={totalSaucesQuantity}
                />
                <HeartButton 
                    data={data} 
                    favorites={favorites}
                    size={size} 
                    dough={dough} 
                    sauces={sauces} 
                    totalPrice={totalPrice}
                />
                <div className="text-2xl text-primary font-bold mx-auto w-fit mt-8 pb-10">
                    {totalPrice} ريال
                </div>
            </ScrollArea>
            <SidebarButton label="اضف للسلة" handleClick={addToCart} disabled={!data}/>
        </div>
    )
}

export default CustomizeClient;