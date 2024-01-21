"use client"

import axios from "axios";
import { useMemo, useState } from "react";
import useCart from "@/hooks/use-cart";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import useCartSheet from "@/hooks/useCartSheet";
import { toast } from "sonner";
import ClientOnly from "../ClientOnly";
import CloseSheet from "../closeSheet";
import CartSummary from "../cartSummary";
import SidebarButton from "./sidebarButton";
import SideItemsList from "./sideItemsList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn, styleToast } from "@/lib/utils"
import { FavoritesWithSauces } from "@/types"

interface SidebarProps {
    favorites: FavoritesWithSauces[];
}

function Sidebar({ favorites }: SidebarProps) {
    const { userId } = useAuth();
    const router = useRouter();
    const cart = useCart();
    const cartSheet = useCartSheet();
    const [active, setActive] = useState<string>("cart")
    const [loading, setLoading] = useState<boolean>(false)
    const cartItems = cart?.items;
    const activeStyle = "bg-secondary-shade text-white font-bold"

    const cartTotalPrice: number = useMemo(() => {
        return cartItems.reduce((total, item) => total + (item.totalPrice * item.quantity), 0)
    },[cartItems])

    const addFavoritesToCart = () => {
        if (favorites.length > 0 && userId) {
            favorites.forEach(favorite => {
                cart.addItem({
                    id: crypto.randomUUID(),
                    name: favorite.name,
                    description: favorite.description,
                    image: favorite.image,
                    backgroundColor: favorite.backgroundColor,
                    price: favorite.price,
                    quantity: favorite.quantity,
                    size: favorite.size ? favorite.size : " ",
                    chosenDough: favorite.chosenDough ? favorite.chosenDough : " ",
                    sauces: favorite.sauces.filter(sauce => sauce.quantity > 0),
                    totalPrice: favorite.totalPrice,
                })
            })
            setActive("cart")
            toast.success("تم اضافة جميع المنتاجات الى السلة" , { style: styleToast })
        }
    }
    
    const onCheckOut = async () => {
        if (!userId) {
            toast.error("يجب عليك تسجيل الدخول اولا")
            router.push("/sign-in")
            return
        }

        toast.loading('إعادة توجيه ...', { style: styleToast });

        try {
            setLoading(true)
            const response = await axios.post(`/api/checkout`, cartItems);
            const checkOutUrl = response.data.url;
            toast.loading('خلاص وصلنا', { style: styleToast });
    
            window.location = checkOutUrl;
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error("حدث خطأ اثناء عملية الشراء");
        } finally{
            setLoading(false)
        }
    }

    return (
        <ClientOnly>
            <div className="relative h-full">
                <Tabs 
                    defaultValue="cart" 
                    value={active}
                    onValueChange={(value) => setActive(value)} 
                    className="w-full bg-white" 
                >
                    <div className="px-3 py-1 shadow-[0_6px_17px_#0003] bg-white rounded-b-2xl">
                        <div className="flex gap-1">
                            <CloseSheet 
                                onClick={() => cartSheet.onClose()}
                                className="w-7 p-1 my-2 2xl:hidden"
                            />
                            <TabsList className="flex justify-between items-center 
                                w-full grid-cols-2 bg-light h-12 my-2 2xl:mt-0">
                                <TabsTrigger 
                                    value="favorites" 
                                    className={cn("rounded-md text-primary w-1/2 h-10 text-md", 
                                    active === "favorites" && activeStyle)}
                                >
                                    المفضلة
                                </TabsTrigger>
                                <TabsTrigger 
                                    value="cart" 
                                    className={cn("rounded-md text-primary w-1/2 h-10 text-md", 
                                    active === "cart" && activeStyle)}
                                >
                                    السلة
                                </TabsTrigger>
                            </TabsList>
                        </div>
                        <CartSummary cartLength={cartItems.length} cartTotalPrice={cartTotalPrice} />
                    </div>

                    <TabsContent value="favorites">
                        <SideItemsList 
                            key="favorites" 
                            data={favorites} 
                            isFavorite
                        />
                        <SidebarButton 
                            label="أضف جميع المنتاجات الى السلة" 
                            handleClick={addFavoritesToCart} 
                            disabled={favorites?.length < 1}
                        />
                    </TabsContent>

                    <TabsContent value="cart">
                        <SideItemsList 
                            key="cart" 
                            data={cartItems} 
                            isFavorite={false}
                        />
                        <SidebarButton 
                            label="تاكيد الطلب" 
                            handleClick={onCheckOut} 
                            disabled={cartItems?.length < 1 || loading}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </ClientOnly>
    )
}

export default Sidebar;