import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface CloseSheetProps {
    onClick: () => void;
    className: string;
}
function CloseSheet({ onClick, className }: CloseSheetProps) {
    return (
        <div 
            className={cn("bg-secondary rounded-md cursor-pointer text-white", className)}
            onClick={onClick}
            role="button"
        >
            <X className="mx-auto h-full" size={20}/>
        </div>
    )
}

export default CloseSheet;