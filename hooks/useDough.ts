import { create } from 'zustand';

interface DoughProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    dough: string;
    onDoughChange: (value: string) => void;
}

const useDough = create<DoughProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    dough: "سميكة",
    onDoughChange: (dough: string) => set({ dough }),
}));


export default useDough;