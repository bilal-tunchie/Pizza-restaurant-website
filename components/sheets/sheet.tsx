"use client"

import {
    Sheet,
    SheetContent,
} from "@/components/ui/sheet"

interface SheetComponentProps {
    isOpen?: boolean;
    onClose: () => void;
    children: React.ReactNode
}

function SheetComponent({ children, isOpen, onClose }: SheetComponentProps) {
    return (
        <Sheet 
            open={isOpen}
            onOpenChange={onClose}
            key="left"
        >
            <SheetContent side="left">
                {children}
            </SheetContent>
        </Sheet>
    )
}

export default SheetComponent;