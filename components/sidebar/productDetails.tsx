import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge"
import { IoIosHeart } from "react-icons/io";
import { styleToast } from "@/lib/utils";
import { toast } from "sonner";
import Image from "next/image";

interface ProductDetailsProps {
    id: string;
    size: string;
    isFavorite: boolean;
    chosenDough: string;
    sauces: {
        label: string;
        quantity: number;
        image: string;
    }[];
}

function ProductDetails({ id, size, isFavorite, chosenDough, sauces } : ProductDetailsProps) {
    const { userId } = useAuth();
    const router = useRouter();

    const removeFromFavorite = async () => {
        if (!userId) {
            router.push("/sign-in")
            return
        }

        if (isFavorite) {
            try {
                await axios.delete(`/api/favorites`,  { data: { favoriteId: id } })
                router.refresh();

                toast.success('تم الحذف من المفضلة', { style: styleToast });
            } catch(error) {
                console.log(error)
                toast.error("something went wrong")   
            }
        }
    }

    return (
        <>
            <div className="flex gap-10">
            {size.length > 1 && 
                <div>
                    <h5 className="mb-3 text-md font-semibold">الحجم</h5>
                    <Badge variant="secondary" className="text-md font-normal">{size}</Badge>
                </div>
            }
            {isFavorite && 
            <div className="flex items-center gap-2" onClick={removeFromFavorite}>
                <div className="bg-primary rounded-full p-2 cursor-pointer w-fit mx-auto" role="button">
                    <IoIosHeart size={38} color="#fff"/>
                </div>
                <h5 className="text-[12px] font-medium">احذفها من المفضلة</h5>
            </div>}
            </div>
            <div className="flex gap-2 mt-5">
                {chosenDough.length > 1 && 
                <div className="pl-1">
                    <h5 className="mb-3 text-sm font-semibold">نوع العجينة</h5>
                    <Badge variant="secondary" className="text-sm font-normal">{chosenDough}</Badge>
                </div>}
                {sauces.length > 0 && 
                <div className="border-r-4 border-white pr-3 flex-1">
                    <h5 className="mb-3 text-sm font-semibold">الصوصات</h5>
                    {sauces.map((sauce) => (
                        <div key={sauce.label} className="flex w-full mb-1" >
                            <div className="flex items-center gap-2">
                                <div>
                                    <Image 
                                        src={sauce.image} 
                                        alt="sauce image" 
                                        width={30}
                                        height={30}
                                        className="rounded-full"
                                    />
                                </div>
                                <h4 className="text-sm">{sauce.label}</h4>
                            </div>
                            <Badge variant="secondary" className="text-sm font-normal mr-auto">{sauce.quantity}x</Badge>
                        </div>
                    ))}
                </div>}
            </div>
        </>
    )
}

export default ProductDetails;