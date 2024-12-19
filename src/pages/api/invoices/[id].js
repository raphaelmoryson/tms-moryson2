// pages/api/Invoices/[id].js

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
                const updatedInvoice = await prisma.invoice.update({
                    where: { id: Number(id) },
                    data: body,
                });

                return res.status(200).json(updatedInvoice);
            } catch (error) {
                console.error("Error updating Invoice:", error);
                return res.status(500).json({ message: 'Error updating Invoice', error: error.message });
            }

        case 'GET':
            try {
                const getWithIdInvoice = await prisma.invoice.findUnique({
                    where: { id: Number(id) }, 
                });

                return res.status(200).json(getWithIdInvoice);
            } catch (error) {
                console.error("Error updating Invoice:", error);
                return res.status(500).json({ message: 'Error updating Invoice', error: error.message });
            }

        default:
            res.setHeader('Allow', ['PUT']);
            return res.status(405).end(`Method ${method} Not Allowed`);
    }
}
