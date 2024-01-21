import { prisma } from '@/lib/db'

export default async function getProducts() {
    const products = await prisma.leceriaProduct.findMany({
        include: {
            flavours: true
        },
        orderBy: {
            createdAt: 'asc'
        }
    })

    return products
}