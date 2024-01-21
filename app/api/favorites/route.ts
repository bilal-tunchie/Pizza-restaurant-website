import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { auth } from '@clerk/nextjs';

export async function POST(request: Request) {
    try {
        const { userId } = auth();
        const body = await request.json();

        if (!userId) {
            return new Response("Unauthorized", { status: 401 });
        }
        
        const requiredFields = [
            "name", "description", "image", "backgroundColor",
            "price", "quantity", "size", "chosenDough", "sauces", "totalPrice"
        ];

        for (const field of requiredFields) {
            if (!body[field]) {
                return new Response(`Missing or invalid ${field}`, { status: 401 });
            }
        }


        const favorites = await prisma.leceriaFavorites.create({
            data: {
                userId,
                name: body.name,
                description: body.description,
                image: body.image,
                backgroundColor: body.backgroundColor,
                price: body.price,
                quantity: body.quantity,
                size: body.size,
                chosenDough: body.chosenDough,
                totalPrice: body.totalPrice,
                sauces: {
                    create:[
                        ...body.sauces.map((sauce: {label: string, quantity: number, image: string}) => ({
                            label: sauce.label,
                            quantity: sauce.quantity,
                            image: sauce.image
                        }))
                    ]
                }
            }
        });

        return NextResponse.json(favorites);
    } catch (error) {

        console.log("[FAVORITE_POST]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { userId } = auth();
        const body = await request.json();

        if (!userId) {
            return new Response("Unauthorized", { status: 401 });
        }

        const { favoriteId } = body;
        
        if (!favoriteId) {
            return new Response("missing or invalid favoriteId", { status: 401 });
        }

        const favorite = await prisma.leceriaFavorites.delete({
            where: {
                userId,
                id: favoriteId
            }
        });

        return NextResponse.json(favorite);
    } catch (error) {

        console.log("[FAVORITE_DELETE]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
