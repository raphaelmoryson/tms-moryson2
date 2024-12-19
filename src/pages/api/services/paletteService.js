// services/paletteService.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function addPalette(nom, size, position, driverId, vehicleId) {
    try {
        const palette = await prisma.palette.create({
            data: {
                nom,
                size,
                position,
                driver: { connect: { id: driverId } }, 
                vehicle: { connect: { id: vehicleId } }, 
            },
        });

        console.log("Palette ajoutée avec succès : ", palette);
        return palette;
    } catch (error) {
        console.error("Erreur lors de l'ajout de la palette : ", error);
        throw error;
    }
}

addPalette("Palette A", "120x80", "Front", 1, 2)  
    .then((palette) => console.log("Palette ajoutée :", palette))
    .catch((error) => console.error("Erreur :", error));
