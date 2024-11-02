import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const closePrismaClient = async () => {
        await prisma.$disconnect();
    };

    try {
        if (req.method === 'POST') {
            const { details, pickupAddress, deliveryAddress, deliveryDate, quantity, weight, driverId, status, dimensions } = req.body;

            const newOrder = await prisma.order.create({
                data: {
                    details,
                    pickupAddress,
                    deliveryAddress,
                    deliveryDate,
                    quantity,
                    weight,
                    driverId,
                    status,
                    dimensions
                }
            });

            res.status(201).json(newOrder);
        } else {
            res.setHeader('Allow', ['POST']);
            return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
        }
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Internal Server Error", error: error }); // Return full error object for more context
    } finally {
        await closePrismaClient();
    }
}
