import { create } from 'zustand';

interface CartSheetProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useCartSheet = create<CartSheetProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));


export default useCartSheet;