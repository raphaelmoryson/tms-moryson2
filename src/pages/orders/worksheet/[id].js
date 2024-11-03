import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import WorkSheetDocument from './worksheetPDF'; // Make sure this path is correct
import dynamic from 'next/dynamic';

const PDFDownloadLink = dynamic(() => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink), { ssr: false });

function Worksheet() {
    const router = useRouter();
    const { id } = router.query;
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        const fetchOrderData = async () => {
            if (id) {
                const response = await fetch(`/api/orders/${id}`);
                const data = await response.json();
                setFormData({
                    id: data.id || '',
                    pickupAddress: data.pickupAddress || '',
                    deliveryAddress: data.deliveryAddress || '',
                    quantity: data.quantity || '',
                    weight: data.weight || '',
                    status: data.status || '',
                    deliveryDate: new Date(data.deliveryDate),
                    driverId: data.driverId || '',
                });
            }
        };

        fetchOrderData();
    }, [id]);

    if (!formData) return <div>Loading...</div>;

    return (
        <div>
            <h1>Fiche de Travail</h1>
            <PDFDownloadLink
                document={<WorkSheetDocument orderDetails={formData} />}
                fileName={`fiche_de_travail_${id}.pdf`}>
                {({ blob, url, loading, error }) =>
                    loading ? 'Loading document...' : 'Download now!'
                }
            </PDFDownloadLink>
            <div>
                <h2>Détails</h2>
                <p>ID de Commande: {id}</p>
                <p>Point de départ: {formData.pickupAddress}</p>
                <p>Destination: {formData.deliveryAddress}</p>
                <p>Quantité: {formData.quantity}</p>
                <p>Poids: {formData.weight}</p>
                <p>Status: {formData.status}</p>
                <p>Date de Livraison: {new Date(formData.deliveryDate).toLocaleDateString()}</p>
                <p>ID du Chauffeur: {formData.driverId}</p>
            </div>
        </div>
    );
}

export default Worksheet;
