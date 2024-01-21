import Image from "next/image"
import offer_1  from "@/public/images/offer_1.png";
import offer_2  from "@/public/images/offer_2.png";
import offer_3  from "@/public/images/offer_3.png";

function Billboard() {
    return (
        <div className="px-2 md:px-4">
            <div className="offers-slideshow" >
                <div className="wrapper" >
                    <Image src={offer_1} alt="" />
                    <Image src={offer_2} alt="" />
                    <Image src={offer_3} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Billboard;