import { prisma } from '@/lib/db'

export default async function getProducts() {
    const offers = await prisma.leceriaOffers.findMany({
        orderBy: {
            createdAt: 'asc'
        }
    })

    return offers
}