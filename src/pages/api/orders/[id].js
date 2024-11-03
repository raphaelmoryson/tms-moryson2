// pages/api/orders/[id].js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const {
        method,
        query: { id },
        body
    } = req;

    switch (method) {
        case 'PUT':
            try {
                const updatedOrder = await prisma.order.update({
                    where: { id: Number(id) },
                    data: body,
                });

                return res.status(200).json(updatedOrder);
            } catch (error) {
                console.error("Error updating order:", error);
                return res.status(500).json({ message: 'Error updating order', error: error.message });
            }

        case 'GET':
            try {
                const getWithIdOrder = await prisma.order.findUnique({
                    where: { id: Number(id) }, 
                });

                return res.status(200).json(getWithIdOrder);
            } catch (error) {
                console.error("Error updating order:", error);
                return res.status(500).json({ message: 'Error updating order', error: error.message });
            }

        default:
            res.setHeader('Allow', ['PUT']);
            return res.status(405).end(`Method ${method} Not Allowed`);
    }
}
