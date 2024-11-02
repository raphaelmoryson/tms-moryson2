import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function OrdersShow() {
    const router = useRouter();
    const { id, details, pickupAddress, deliveryAddress, quantity, weight, status, deliveryDate, driverName, driverRole } = router.query;

    const [formData, setFormData] = useState({
        details: '',
        pickupAddress: '',
        deliveryAddress: '',
        quantity: '',
        weight: '',
        status: '',
        deliveryDate: '',
        driverName: '',
        driverRole: ''
    });

    useEffect(() => {
        if (router.isReady) {
            setFormData({
                details: details || '',
                pickupAddress: pickupAddress || '',
                deliveryAddress: deliveryAddress || '',
                quantity: quantity || '',
                weight: weight || '',
                status: status || '',
                deliveryDate: deliveryDate || '',
                driverName: driverName || '',
                driverRole: driverRole || ''
            });
        }
    }, [router.isReady, details, pickupAddress, deliveryAddress, quantity, weight, status, deliveryDate, driverName, driverRole]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`/api/orders/${id}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            router.push('/orders');
        } else {
            // Handle error
            console.error("Failed to update order");
        }
    };

    

    return (
        <div className="order-details">
            <h2>Détails de la Commande</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Détails :</label>
                    <input type="text" name="details" value={formData.details} onChange={handleChange} required />
                </div>
                <div>
                    <label>Adresse de Ramassage :</label>
                    <input type="text" name="pickupAddress" value={formData.pickupAddress} onChange={handleChange} required />
                </div>
                <div>
                    <label>Adresse de Livraison :</label>
                    <input type="text" name="deliveryAddress" value={formData.deliveryAddress} onChange={handleChange} required />
                </div>
                <div>
                    <label>Quantité :</label>
                    <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
                </div>
                <div>
                    <label>Poids (kg) :</label>
                    <input type="number" name="weight" value={formData.weight} onChange={handleChange} required />
                </div>
                <div>
                    <label>Statut :</label>
                    <select name="status" value={formData.status} onChange={handleChange} required>
                        <option value="IN_PROGRESS">En cours</option>
                        <option value="DELIVERED">Livré</option>
                    </select>
                </div>
                <div>
                    <label>Date de Livraison :</label>
                    <input type="date" name="deliveryDate" value={formData.deliveryDate.split('T')[0]} onChange={handleChange} required />
                </div>
                <div>
                    <label>Chauffeur :</label>
                    <input type="text" name="driverName" value={formData.driverName} onChange={handleChange} required />
                </div>
                <button type="submit">Modifier la Commande</button>
            </form>
        </div>
    );
}

export default OrdersShow;
