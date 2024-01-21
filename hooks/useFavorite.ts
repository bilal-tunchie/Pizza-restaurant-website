import axios from "axios";
import { useCallback, useMemo } from "react";
import useCustomizeSheet from "@/hooks/useCustomizeSheet"
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { CartProducts } from '@/types';
import { FavoritesWithSauces } from "@/types"
import isEqualObjects from "@/lib/isEqualObjects";
import { styleToast } from "@/lib/utils"


const useFavorite =  (data: CartProducts, favorites: FavoritesWithSauces[]) => { 
    const customizeSheet = useCustomizeSheet();
    const router = useRouter();
    const { userId } = useAuth();

    const hasFavorited: {isEqual :boolean, favoriteId: string | null} = useMemo(() => {
        let isEqual = false
        let favoriteId: string | null = null; 

        favorites.forEach(item => {
            if (isEqualObjects(item, data) && item.name === data.name) {
                favoriteId = item.id;
                isEqual = true
                return isEqual
            }

        })
        
        return { isEqual, favoriteId }
    }, [data, favorites])

    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        if (!userId) {
            customizeSheet.onClose();
            router.push("/sign-in")
            return
        };
        
        try {
            let request;

            if (hasFavorited.isEqual) {
                request = () => axios.delete(`/api/favorites`,  { data: { favoriteId: hasFavorited.favoriteId } })
            } else {
                request = () => axios.post(`/api/favorites`, data)
            }

            await request()
            router.refresh();
            toast.success(hasFavorited.isEqual ? 'تم الحذف من المفضلة' : 'تم اضافته الي المفضلة', { style: styleToast });
        } catch(error) {
            console.log(error)
            toast.error("something went wrong") 
        }
    }, [ router, data, hasFavorited, userId, customizeSheet ])


    return {
        hasFavorited, 
        toggleFavorite
    }
}

export default useFavorite;