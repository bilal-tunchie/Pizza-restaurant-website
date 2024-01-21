import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import { CartProducts } from '@/types';
import isEqualObjects from "@/lib/isEqualObjects"
import _ from "lodash/isEqual"

interface CartStore {
    items: CartProducts[];
    addItem: (data: CartProducts) => void;
    removeItem: (id: string) => void;
    onQuantityChange: (id: string, quantity: number) => void;
    removeAll: () => void;
}

const useCart = create(
    persist<CartStore>(
        (set, get) => ({
            items: [],

            addItem: (data: CartProducts) => {
                const currentItems = get().items;
                let isEqual = false

                currentItems.forEach(item => {
                    if (isEqualObjects(item, data) && item.name === data.name) {
                        const removeExistingItem = currentItems.filter(el => el.id !== item.id);

                        set({ items: [...removeExistingItem, {...data, quantity: 1 + item.quantity}]})
                        isEqual = true 
                    }
                })

                if (isEqual) {
                    return
                }

                set({ items: [...get().items, data]})
            },

            removeItem: (id: string) => {
                set({ items: [...get().items.filter( item => item.id !== id)]})
            },

            onQuantityChange: (id: string, quantity: number) => {
                const currentItems = get().items;
                const existingItemIndex = currentItems.findIndex(item => item.id === id);
                
                if (existingItemIndex !== -1){
                    const modifyingItem = currentItems[existingItemIndex];

                    set({
                        items: [
                            ...currentItems.slice(0, existingItemIndex),
                            { ...modifyingItem, quantity: quantity },
                            ...currentItems.slice(existingItemIndex + 1)
                        ]
                    });
                }
            },

            removeAll: () => set({ items: []})
        }),
        {
            name: "leceria-pizza-store-cart",
            storage: createJSONStorage(() => localStorage),
        }
    )
)

export default useCart;