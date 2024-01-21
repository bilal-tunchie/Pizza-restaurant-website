"use client"

import useCart from '@/hooks/use-cart'
import { format } from 'date-fns'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { ordersWithOrderItems } from "@/types";
import OrderItem from './OrderItem'

interface OrdersClientProps {
    orders: ordersWithOrderItems[] | [];
    bluryImage: string | undefined;
}

function OrdersClient({ orders, bluryImage }: OrdersClientProps) {
    const cart = useCart();
    const searchParams = useSearchParams();
    const paymentCompletedShownRef = useRef(false);

    useEffect(()=> {
        if (searchParams.get('success') && !paymentCompletedShownRef.current) {
            toast.success('تم التسديد،  شكرا لك على الشراء');
            paymentCompletedShownRef.current = true; // prevent toast to render twice 
            cart.removeAll();
        }
        if (searchParams.get('canceled') && !paymentCompletedShownRef.current) {
            toast.error("تم الغاء عملية الشراء");
            paymentCompletedShownRef.current = true; // prevent toast to render twice 
        }
    }, [searchParams, cart])

    // const orderTotalPrice = (order: ordersWithOrderItems): number => {
    //     return order.orderItems.reduce((total, item) => total + (item.price * item.quantity), 0)
    // };

    return (
        <div className='w-[97%] md:w-3/4 mx-auto'>
            <Accordion type="single" collapsible  dir='ltr'>
                {orders.map((order, i) => (
                    <AccordionItem value={order.id} className="text-xl mb-5" key={order.id}>
                        
                        <AccordionTrigger className="relative p-4 bg-light rounded-t-lg">
                            <p 
                                className='absolute right-0 top-0 h-full text-white w-6 
                                flex items-center justify-center rounded-tr-lg bg-secondary'
                            >
                                {i + 1}
                            </p>
                            <div 
                                className='flex justify-between gap-10 text-sm sm:text-lg 
                                text-right sm:px-24 px-6 w-full items-center' 
                            >
                                <div>
                                    <p className='text-primary font-semibold text-xl mb-5'>
                                        {/* {orderTotalPrice(order)} ريال */}
                                    </p>
                                    <p dir='ltr'>{format(order.createdAt, 'dd MMM, yyy')}</p>
                                    <p className='text-secondary font-semibold'>تم التوصيل</p>
                                </div>
                                <div className='max-w-[200px] text-left text-[16px]'>
                                    <p>{order.address}</p>
                                    <p dir='rtl'>{order.phone.slice(1)}</p>
                                </div>
                            </div>
                        </AccordionTrigger>

                        <AccordionContent className="text-sm sm:text-lg px-4 py-6 bg-primary text-white rounded-b-lg">
                            {order.orderItems.map((item) => (
                                <OrderItem key={item.id} item={item} bluryImage={bluryImage}/>
                            ))}
                        </AccordionContent>

                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}

export default OrdersClient;