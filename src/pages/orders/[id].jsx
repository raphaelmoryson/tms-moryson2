import useFetchReducer from '@/useFetchReducer';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function OrdersShow() {
    const { data: drivers, loading, error } = useFetchReducer('/api/drivers');
    const router = useRouter();
    const { id } = router.query;

    const [formData, setFormData] = useState({
        details: '',
        pickupAddress: '',
        deliveryAddress: '',
        quantity: '',
        weight: '',
        status: '',
        deliveryDate: '',
        driverId: ''
    });

    useEffect(() => {
        if (router.isReady) {
            // Charger les données de la commande
            const fetchOrderData = async () => {
                const response = await fetch(`/api/orders/${id}`);
                const data = await response.json();

                setFormData({
                    details: data.details || '',
                    pickupAddress: data.pickupAddress || '',
                    deliveryAddress: data.deliveryAddress || '',
                    quantity: data.quantity || '',
                    weight: data.weight || '',
                    status: data.status || '',
                    deliveryDate: new Date(data.deliveryDate),
                    driverId: data.driverId || ''
                });
            };

            fetchOrderData();
        }
    }, [router.isReady, id]);

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
            router.push('/?path=orders');
        } else {
            console.error("Failed to update order");
        }
    };

    if (loading) return <p>Loading drivers...</p>;
    if (error) return <p>Error fetching drivers: {error}</p>;
    const formatDateToString = (date) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toISOString().split('T')[0];
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
                    <input
                        type="date"
                        name="deliveryDate"
                        value={formatDateToString(formData.deliveryDate)}
                        onChange={(e) => {
                            const { value } = e.target;
                            setFormData({
                                ...formData,
                                deliveryDate: new Date(value)
                            });
                        }}
                        required
                    />
                </div>

                <div>
                    <label>Chauffeur :</label>
                    <select
                        name="driverId"
                        value={formData.driverId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Sélectionner un chauffeur</option>
                        {drivers.map((driver) => (
                            <option key={driver.id} value={driver.id}>
                                {driver.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit">Modifier la Commande</button>
            </form>
        </div>
    );
}

export default OrdersShow;
