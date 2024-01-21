import { prisma } from '@/lib/db'
import { auth } from '@clerk/nextjs';

export default async function getProducts() {
    const { userId } = auth();
    
    if (!userId) {
        return []
    }

    const getFavorites = await prisma.leceriaFavorites.findMany({
        where: {
            userId
        },
        include: {
            sauces: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return getFavorites;
};