import { 
    LeceriaProduct, 
    LeceriaFlavours, 
    LeceriaOffers, 
    LeceriaFavorites, 
    LeceriaSauces, 
    LeceriaOrder,
    LeceriaOrderItem 
} from "@prisma/client";

export type ProductWithFlavours = Omit<
    LeceriaProduct, 
    "createdAt" | "updatedAt" 
> & { 
    flavours: LeceriaFlavours[] 
};

export type FavoritesWithSauces = Omit<
    LeceriaFavorites, 
    "createdAt" | "updatedAt" 
> & { 
    sauces: LeceriaSauces[] 
};

export type Offers = Omit<
    LeceriaOffers, 
    "createdAt" | "updatedAt" 
>;

export type CartProducts = Omit<
    LeceriaProduct, 
    "createdAt" | "updatedAt" | "sizes" | "dough" | "sauces" 
> & { 
    size: string
    chosenDough: string,
    sauces: {label: string, quantity: number, image: string}[],
    totalPrice: number
};

export type ordersWithOrderItems = LeceriaOrder & {
    orderItems: LeceriaOrderItem[]
};

