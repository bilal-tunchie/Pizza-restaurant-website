"use client"

import useCustomizeSheet from "@/hooks/useCustomizeSheet"
import { Plus } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Offers } from "@/types"

interface OffersCardProps {
    data: Offers[];
}

function OffersClient({ data }: OffersCardProps) {

    const customizeSheet = useCustomizeSheet();

    const onCustomizeProduct = (id: string) => {
        const productToBeCustomized = data.find(item => item.id === id);
        
        if (productToBeCustomized) {
            customizeSheet.onDataChange(productToBeCustomized);
            customizeSheet.onOpen()
        }
    }

    return (
        <div className='flex flex-wrap justify-center gap-y-32 pb-48'>
            {data.map(item => (
                <div
                    className="relative flex justify-between gap-4 md:w-[80%] w-[90%]
                    lg:w-[45%] min-h-[200px] shadow-[0_6px_17px_#0003] cursor-pointer p-4 mx-auto rounded-t-2xl"
                    key={item?.id}
                    onClick={() => onCustomizeProduct(item.id)}
                >
                    <div className="w-full">
                        <Image
                            src={item.image}
                            alt=""
                            fill
                            className='rounded-t-2xl overflow-hidden spinner'
                            onLoadingComplete={(image) => image.classList.remove('spinner')}
                        />
                    </div>
                    <span
                        className='shadow-[rgba(0,0,0,0.2)_0px_12px_28px_0px,rgba(0,0,0,0.1)_0px_2px_4px_0px,rgba(255,255,255,0.05)_0px_0px_0px_1px_inset] absolute -left-5 -bottom-3 flex items-center bg-white z-[10]
                        text-medium p-2.5 rounded-[50%]'
                    >
                        {<Plus size={30} />}
                    </span>
                    <div className='absolute top-[96%] left-0 text-center text-secondary p-3 bg-light w-full h-fit rounded-b-2xl'>
                        <h4 className="text-lg text-primary font-semibold mb-2">{item.name}</h4>
                        <p>{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default OffersClient;