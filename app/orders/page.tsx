import Link from "next/link";
import { currentUser  } from "@clerk/nextjs";
import getOrders from "@/actions/getOrders"
import { blurImage } from "@/lib/imageBuffer";

import Heading from "@/components/heading"
import { FaPizzaSlice } from "react-icons/fa";
import OrdersClient from "./_componenets/ordersClient";

export async function generateMetadata() {
    const user = await currentUser();

    if (user) {
        return {
            title: `طلبات ${user?.firstName}`,
        };
    }

    return {
        title: `الطلبات`,
    };
}

async function Offerspage() {
    const orders = await getOrders();
    const bluryImage = await blurImage();

    return (
        <div className="mt-24">
            <Heading title="الطلبات" />
            {!orders || orders.length === 0 
            ?
            <div className='mx-auto w-fit flex flex-col gap-6 text-center'>
                <div
                    className="mx-auto text-light bg-white shadow-[rgba(0,0,0,0.1)_0px_4px_6px_-1px,rgba(0,0,0,0.06)_0px_2px_4px_-1px] p-5 rounded-full text-3xl"
                >
                    <FaPizzaSlice size={50} />
                </div>
                <p>ماعندك طلبات هاللحظة . . . </p>
                <Link 
                    href='/' 
                    className="bg-light border-primary shadow-[var(--color-primary)_4px_4px_0_0] text-primary inline-block font-semibold text-lg leading-[50px] text-center select-none touch-manipulation px-[18px] py-0 rounded-[30px] border-2 -webkit-user-select: none hover:bg-white"
                >
                    <span>العودة الى القائمة</span>
                </Link>
            </div>
            :
            // <OrdersClient orders={orders} bluryImage={bluryImage}/>
            <></>
            }
        </div>
    )
}

export default Offerspage