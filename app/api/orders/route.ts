import prisma from '@/db'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
export async function GET(req: NextRequest) {
    try {
        const status: any = await req.nextUrl.searchParams.get('status')
        const orderId = await req.nextUrl.searchParams.get('id')
        const brandId = await req.nextUrl.searchParams.get('brandId')
        const userId = await req.nextUrl.searchParams.get('userId')
        if (userId) {
            const response = await prisma.order.findMany({
                where: {
                    userId: userId
                },
                orderBy: [
                    {
                        orderId: 'desc'
                    }
                ],
                include: {
                    orderProducts: {
                        include: {
                            product: {
                            }
                        }
                    }
                }

            })
            return NextResponse.json({
                status: 200,
                userId: userId,
                data: response
            })
        }
        if (brandId) {
            const response = await prisma.order.findMany({
                where: {
                    brandId: parseInt(brandId)
                },
                include: {
                    orderProducts: {
                        include: {
                            product: {

                            }
                        }
                    }
                }
            })
            return NextResponse.json({
                status: 200,
                h: brandId,
                data: response
            })
        }
        if (orderId) {
            const responce = await prisma.order.findMany({
                where: {
                    orderId: parseInt(orderId)
                },
                include: {
                    orderProducts: {
                        include: {
                            product: {

                            }
                        }
                    }
                }
            },

            )
            return NextResponse.json({
                status: 200,
                data: responce,

            })

        }
        else if (status) {
            const responce = await prisma.order.findMany({
                where: {
                    orderStatus: status!
                },
                include: {
                    orderProducts: {
                        include: {
                            product: {

                            }
                        }
                    }
                }
            },
            )
            return NextResponse.json({
                status: 200,
                data: responce
            })

        }
        else {
            const responce = await prisma.order.findMany({
                orderBy: [
                    {
                        orderId: 'desc'
                    }
                ],
                include: {
                    orderProducts: {
                        include: {
                            product: {

                            }
                        }
                    }
                }
            },

            )
            return NextResponse.json({
                status: 200,
                data: responce
            })
        }
    } catch (error) {
        return NextResponse.json({
            status: 404,
            message: "something went wrong"
        })
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        if (!data || !data.brandId || !data.address || !data.totalamount || !data.userId || !data.products) {
            return NextResponse.json({
                status: 400,
                message: "Invalid request data"
            });
        }

        const check = await prisma.brand.findUnique({
            where: {
                id: data.brandId
            }
        });

        if (check?.isFeatured) {
            const response = await prisma.order.create({
                data: {
                    address: data.address,
                    totalAmount: data.totalamount,
                    userId: data.userId,
                    brandId: data.brandId,
                    orderProducts: {
                        create: data.products.map((item: { productId: number, quantity: number }) => ({
                            quantity: item.quantity,
                            product: {
                                connect: { id: item.productId }
                            }
                        }))
                    }
                }
            });

            return NextResponse.json({
                status: 200,
                data: response
            });
        } else {
            return NextResponse.json({
                status: 200,
                message: "Shop is closed"
            });
        }
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: error || "Internal Server Error"
        });
    }
}
export async function PATCH(req: NextRequest) {
    try {
        const data = await req.json()
        const responce = await prisma.order.update({
            where: {
                orderId: data.orderid
            },
            data: {
                orderStatus: data.status
            }
        })
        return NextResponse.json({
            status: 200,
            data: responce
        })
    } catch (error) {
        return NextResponse.json({
            status: 404,
            message: error
        })
    }
}