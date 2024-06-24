import prisma from '@/db'
import { NextRequest, NextResponse } from 'next/server'
export async function GET(req: NextRequest) {
    try {
        const response = await prisma.product.findMany({
            orderBy: [
                {
                    id: 'asc'
                }
            ],
            where: {
                brand: {
                    isOpen: true
                }
            },
        })
        return NextResponse.json({
            status: 200,
            data: response
        })

    } catch (error) {
        return NextResponse.json({
            status: 404,
            "message": "something went wrong"
        })
    }
}