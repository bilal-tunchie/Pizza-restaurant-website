import Stripe from "stripe";
import { NextResponse } from "next/server";
import { auth } from '@clerk/nextjs';
import { CartProducts } from "@/types"

import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
    const { userId } = auth();

    if (!userId) {
        return new Response("Unauthorized", { status: 401 });
    }

    const products = await req.json();

    if (!products || products.length === 0) {
        return new NextResponse("Products are required", { status: 401 });
    }

    function formatProductDescription(product: CartProducts) {
        let description = "";

        if (product?.chosenDough.length > 1) {
            description += `${product?.chosenDough}`;
        }

        if (product?.size.length > 1) {
            description += ` . ${product.size}`;
        }

        if (product?.sauces?.length > 0) {
            const sauceLabels = product?.sauces?.map((sauce: any) => sauce.label).join(" , ");
            description += ` .  الصوصات : ${sauceLabels}`;
        }

        return description;
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    products.forEach((product: CartProducts) => {
        line_items.push({
            quantity: product.quantity,
            price_data: {
                currency: 'SAR',
                product_data: {
                    name: product.name,
                    images: [product.image],
                    description: formatProductDescription(product).length > 0
                    ? formatProductDescription(product)
                    : " ",
                },
                unit_amount: product.totalPrice * 100
            },
        });
    });

    // await prismadb.LeceriaOrderItem.deleteMany()
    // await prismadb.leceriaOrder.deleteMany()

    const order = await prisma.leceriaOrder.create({
        data: {
            userId,
            isPaid: false,
            orderItems: {
                create: [...products.map((product: any) => ({
                    name: product.name,
                    image: product.image,
                    description: formatProductDescription(product),
                    quantity: product.quantity,
                    price: product.totalPrice,
                }))]
            }
        }
    });

    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        billing_address_collection: 'required',
        phone_number_collection: {
            enabled: true,
        },
        success_url: `${process.env.FRONTEND_STORE_URL}/orders?success=1`,
        cancel_url: `${process.env.FRONTEND_STORE_URL}/orders?canceled=1`,
        metadata: {
            orderId: order.id
        },
    });

    return NextResponse.json({ url: session.url }, {
        headers: corsHeaders
    });
};