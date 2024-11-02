import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const closePrismaClient = async () => {
        await prisma.$disconnect();
    };
    try {
        if (req.method === 'GET') {
            const orders = await prisma.order.findMany({
                include: {
                    driver: true,
                },
            });
            if (orders.length === 0) {
                return res.status(404).json({ message: "No orders found." });
            }
            res.status(200).json(orders);
        } else {
            res.setHeader('Allow', ['GET']);
            return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
        }
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    } finally {
        await closePrismaClient();
    }
}
