import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const {
        method,
        query: { id: driverId, date },
    } = req;

    switch (method) {
        case 'GET':
            try {
                const targetDate = new Date(date);
                if (isNaN(targetDate)) {
                    return res.status(400).json({ message: 'Invalid date format', receivedDate: date });
                }
                
                targetDate.setUTCHours(0, 0, 0, 0); 
                const startOfDay = targetDate;
                const endOfDay = new Date(targetDate.getTime() + 24 * 60 * 60 * 1000);
                
                const getOrdersByDriverId = await prisma.order.findMany({
                    where: {
                        driverId: Number(driverId),
                        deliveryDate: {
                            gte: startOfDay,
                            lt: endOfDay,
                        },
                    },
                });

                if (!getOrdersByDriverId || getOrdersByDriverId.length === 0) {
                    return res.status(404).json({
                        message: `No orders found for driverId ${driverId} on the date ${date}`,
                        startOfDay,
                        endOfDay,
                    });
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
