import { create } from 'zustand';
import { ProductWithFlavours } from "@/types";
interface CustomizeSheetProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    data: ProductWithFlavours | {}
    onDataChange: (data: any) => void
}

const useCustomizeSheet = create<CustomizeSheetProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    data: {},
    onDataChange: (data: ProductWithFlavours) => set({ data: data }),
}));


export default useCustomizeSheet;