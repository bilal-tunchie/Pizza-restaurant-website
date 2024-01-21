'use client';

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
    value: number;
    onChange: (value: number) => void;
    totalSaucesQuantity?: number;
}

const Counter: React.FC<CounterProps> = ({
    value,
    onChange,
    totalSaucesQuantity
}) => {
    const onAdd = useCallback(() => {
        if (totalSaucesQuantity === 8) {
            return;
        }
        onChange(value + 1);
    }, [onChange, value, totalSaucesQuantity]);

    const onReduce = useCallback(() => {
        if (value === 0) {
            return;
        }

        onChange(value - 1);
    }, [onChange, value]);

    return (
        <div className="relative flex flex-row items-center h-[22px] w-[90px] bg-white rounded-full gap-6">
            <div
                onClick={onReduce}
                className="h-full w-1/2 rounded-r-full bg-white flex items-center 
                justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition text-sm"
                role="button"
            >
                <AiOutlineMinus />
            </div>
            <div className="absolute top-1/2 left-1/2 bg-white rounded-full h-8 w-8 z-[10] font-light text-xl
                text-neutral-600 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 select-none"
            >
                {value}
            </div>
            <div
                onClick={onAdd}
                className="h-full w-1/2 rounded-l-full bg-secondary flex items-center text-sm 
                justify-center text-white cursor-pointer hover:opacity-80 transition"
                role="button"
            >
                <AiOutlinePlus />
            </div>
        </div>
    );
}

export default Counter;