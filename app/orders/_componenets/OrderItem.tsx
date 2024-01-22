import { LeceriaOrderItem } from "@prisma/client";
import Image from "next/image";
interface OrderItemProps {
    item: LeceriaOrderItem;
    bluryImage: string | undefined;
}

function OrderItem({ item, bluryImage }: OrderItemProps) {
    return (
        <div className="flex gap-5 items-center justify-between mb-10">
            <div>
                <Image 
                    src={item.image} 
                    alt="product image" 
                    width={70}
                    height={70}
                    placeholder="blur"
                    blurDataURL={bluryImage}
                />
            </div>
            <div className="flex-1">
                <p>{item.name}</p>
                <p className="text-[12px] mt-4 text-light-shade">{item.description}</p>
            </div>
            <div className="flex gap-3 sm:gap-16 w-32 sm:w-48 justify-between">
                <p dir="ltr" className="text-center w-16">{item.quantity + " x " + item.price}</p>
                <p>{item.quantity * item.price} ريال</p>
            </div>
        </div>
    )
}

export default OrderItem;