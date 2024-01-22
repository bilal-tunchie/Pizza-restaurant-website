import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface SidebarButtonProps {
    label: string;
    handleClick: () => void;
    disabled: boolean;
}
function SidebarButton({label, handleClick, disabled}: SidebarButtonProps) {
    return (
        <div 
            className={
                cn("absolute bg-white bottom-0 right-0 w-full border-2 flex justify-center items-center h-20 shadow-[rgba(0,0,00.45)_0px_0px_25px_0px] rounded-t-2xl", disabled && "cursor-not-allowed")
            }
        >
            <Button 
                className="w-[93%] h-12 text-md rounded-md mx-auto select-none"
                onClick={handleClick}
                disabled={disabled}
            >
                {label}
            </Button>
        </div>
    )
}

export default SidebarButton;