"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "../ui/badge"

interface RadioInputProps {
    value: string;
    className: string;
    items: string[];
    onChange: (value: string) => void;
}

function RadioInput({
    value,
    onChange,
    className,
    items
}: RadioInputProps) {

    const onValueChange = (newValue: string) => {
        onChange(newValue);
    };

    return (
        <RadioGroup 
            defaultValue={items[0]}
            onValueChange={(value) => onValueChange(value)}
            dir="rtl" 
            className={className}
        >
            <div className="relative flex items-center w-[69px] h-8 rounded-full">
                <RadioGroupItem
                    value={items[0]}
                    id={items[0]}
                    className="z-[5] w-full h-full opacity-5"
                />
                <Badge 
                    className="absolute text-md font-normal px-4 
                    cursor-pointer shadow-[0_6px_17px_#0003]" 
                    variant={value === items[0] ? "default" : "outline"}
                >
                    {items[0]}
                </Badge>
            </div>
            <div className="relative flex items-center w-[69px] h-8 rounded-full">
                <RadioGroupItem
                    value={items[1]}
                    id={items[1]}
                    className="z-[5] w-full h-full opacity-5"
                />
                <Badge 
                    className="absolute text-md font-normal px-4 
                    cursor-pointer shadow-[0_6px_17px_#0003]" 
                    variant={value === items[1] ? "default" : "outline"}
                >
                    {items[1]}
                </Badge>
            </div>
            <div className="relative flex items-center w-[117px] h-8 rounded-full">
                <RadioGroupItem
                    value={items[2]}
                    id={items[2]}
                    className="z-[5] w-full h-full opacity-5"
                />
                <Badge 
                    className="absolute text-md font-normal px-4 
                    cursor-pointer shadow-[0_6px_17px_#0003]" 
                    variant={value === items[2] ? "default" : "outline"}
                >
                    {items[2]}
                </Badge>
            </div>
            
        </RadioGroup>
    )
}

export default RadioInput