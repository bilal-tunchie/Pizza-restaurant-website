import Image from "next/image"

import Counter from "../Counter";
import { ProductWithFlavours } from "@/types";

export const initialSauces = [
    {label: "الرانش", quantity: 0, image: "https://res.cloudinary.com/dqm9t55ik/image/upload/w5vkfpetcow03axkoqto.jpg"}, 
    {label: "الحراق", quantity: 0, image: "https://res.cloudinary.com/dqm9t55ik/image/upload/lwrszg8p2giwchs5topa.jpg"}, 
    {label: "الباربكيو", quantity: 0, image: "https://res.cloudinary.com/dqm9t55ik/image/upload/sqeepzehwg2jkoi21alg.jpg"}, 
    {label: "صوص الداينمايت", quantity: 0, image: "https://res.cloudinary.com/dqm9t55ik/image/upload/dahanpounhxcq1vbzdje.jpg"}, 
];

interface SaucePickerProps {
    data: ProductWithFlavours;
    setSauces: React.Dispatch<React.SetStateAction<{label: string, quantity: number, image: string}[]>>;
    totalSaucesQuantity: number;
    sauces: {
        label: string;
        quantity: number;
        image: string;
    }[]
}

function SaucePicker({ data, sauces, setSauces, totalSaucesQuantity }: SaucePickerProps) {

    const onSaucesChange = (quantity: number, label: string, image: string) => {
        if (label) {
            setSauces(prev => {
                const index = prev.findIndex(sauce => sauce.label === label);
                if (index !== -1) {
                    return [
                        ...prev.slice(0, index),
                        { label, quantity, image },
                        ...prev.slice(index + 1)
                    ];
                } else {
                    return [...prev, { label, quantity, image }];
                }
            })
        }
    }

    return (
        <>
            {data.sauces && <div>
                <h3 className="mt-4 text-lg mb-5 font-semibold">صلصات (اختر حتى 8)</h3>
                {sauces.map((sauce, i) => (
                    <div className="flex items-center justify-between mt-5" key={sauce.label + i}>
                        <Counter
                            value={sauce.quantity}
                            onChange={(value) => onSaucesChange(value, sauce.label, sauce.image)}
                            totalSaucesQuantity={totalSaucesQuantity}
                        />
                        <p>{sauce.label} (+4 ريال)</p>
                        <div>
                            <Image
                                src={sauce.image}
                                alt=""
                                width={35}
                                height={35}
                                className="rounded-full"
                            />
                        </div>
                    </div>
                ))}
            </div>}
        </>
    )
}

export default SaucePicker;