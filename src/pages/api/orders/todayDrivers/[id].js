import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const {
        method,
        query: { id: driverId },
    } = req;

    switch (method) {
        case 'GET':
            try {
                const today = new Date();
                today.setHours(0, 0, 0, 0);  
                const getOrdersByDriverId = await prisma.order.findMany({
                    where: {
                        driverId: Number(driverId),
                        deliveryDate: {
                            gte: today,
                            lt: new Date(today.getTime() + 24 * 60 * 60 * 1000), 
                        },
                    },
                });

                if (!getOrdersByDriverId || getOrdersByDriverId.length === 0) {
                    return res.status(404).json({ message: 'No orders found for this driverId and delivery date today' });
                }

                return res.status(200).json(getOrdersByDriverId);
            } catch (error) {
                console.error("Error fetching orders:", error);
                return res.status(500).json({ message: 'Error fetching orders', error: error.message });
            }

        default:
            res.setHeader('Allow', ['GET']);
            return res.status(405).end(`Method ${method} Not Allowed`);
    }
}
