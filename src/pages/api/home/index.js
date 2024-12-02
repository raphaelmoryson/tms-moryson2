import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const closePrismaClient = async () => {
        await prisma.$disconnect();
    };
    try {
        if (req.method === 'GET') {
            const drivers = await prisma.driver.findMany();
            const orders = await prisma.order.findMany();

            res.status(200).json([drivers,orders]);
        } else {
            res.setHeader('Allow', ['GET']);
            return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
        }
    } catch (error) {
        console.error("Error fetching drivers:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    } finally {
        await closePrismaClient();
    }
}
