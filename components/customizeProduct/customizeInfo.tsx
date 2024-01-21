import Image from 'next/image'
import { ProductWithFlavours } from "@/types";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"

interface CustomizeInfoProps {
    data: ProductWithFlavours;
    bluryImage: string | undefined;
}

function CustomizeInfo({ data, bluryImage }: CustomizeInfoProps) {
    const pathName = usePathname();
    const isOffer = pathName === "/offers"

    return (
        <div 
            className={cn("bg-primary rounded-2xl p-4 text-white mt-2", 
                data.backgroundColor && data.backgroundColor
            )}
        >
            <h4 className="text-lg mb-2">{data.name}</h4>
            <p className="mb-6">{data.description}</p>
            <div className={cn(isOffer && "mt-10")}>
                <Image 
                    src={data.image} 
                    alt="" 
                    width={isOffer ? 400 : 300}
                    height={isOffer ? 400 : 300}
                    className={cn("mx-auto", isOffer && "rounded-3xl")}
                    blurDataURL={bluryImage}
                    placeholder="blur"
                />
            </div>
        </div>
    )
}

export default CustomizeInfo;