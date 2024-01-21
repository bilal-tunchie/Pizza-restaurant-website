import { prisma } from '@/lib/db'
import { auth } from '@clerk/nextjs';

export default async function getOrders() {
    const { userId } = auth();
    
    if (!userId) {
        return []
    }

    const orders = await prisma.leceriaOrder.findMany({
        where: {
            userId,
            isPaid: true
        },
        include: {
            orderItems: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return orders;
};