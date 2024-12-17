import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).json({ error: `Méthode ${req.method} non autorisée` });
    }

    const {
        invoiceNumber,
        issuanceDate,
        dueDate,
        customerName,
        customerAddress,
        customerCity = null, 
        customerZipCode,
        paymentStatus = "Pending", 
        createdBy,
        priceList = [],
        dateList = [],
        pickupList = [],
        deliveryList = [],
        referenceList = []
    } = req.body;

    if (
        !invoiceNumber || 
        !issuanceDate || 
        !dueDate || 
        !customerName || 
        !customerAddress || 
        !customerZipCode || 
        !createdBy
    ) {
        return res.status(400).json({ error: "Champs obligatoires manquants" });
    }

    try {
        const newInvoice = await prisma.invoice.create({
            data: {
                invoiceNumber,
                issuanceDate: new Date(issuanceDate),
                dueDate: new Date(dueDate),
                customerName,
                customerAddress,
                customerCity,
                customerZipCode,
                paymentStatus,
                createdBy,
                priceList,
                dateList,
                pickupList,
                deliveryList,
                referenceList,
            },
        });

        return res.status(201).json(newInvoice);

    } catch (error) {
        console.error("Erreur lors de la création de la facture:", error);
        return res.status(500).json({ error: "Une erreur est survenue lors de la création de la facture" });
    }
}
