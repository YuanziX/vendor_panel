'use server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function updateOrder(status: any, id: number) {
    try {
        console.log(status,id)
        const resp = await prisma.order.update({
            where: {
                orderId: id
            },
            data: {
                orderStatus:status
            }
        });
        return resp;
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message || 'Failed to update order');
    }
}
