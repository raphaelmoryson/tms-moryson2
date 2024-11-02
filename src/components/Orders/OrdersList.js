import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function OrdersList() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getOrders() {
            try {
                const response = await fetch("api/orders");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error("Error fetching orders:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        getOrders();
    }, []);

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p>Error fetching orders: {error}</p>;

    return (
        <div className="orders-list">
            <h2 className="title">Liste des Commandes</h2>
            <div className="table">
                <div className="table-header">
                    <div className="table-row">
                        <div className="table-cell">Détails</div>
                        <div className="table-cell">Adresse de Ramassage</div>
                        <div className="table-cell">Adresse de Livraison</div>
                        <div className="table-cell">Quantité</div>
                        <div className="table-cell">Poids (kg)</div>
                        <div className="table-cell">Statut</div>
                        <div className="table-cell">Date de Livraison</div>
                        <div className="table-cell">Chauffeur</div>
                        <div className="table-cell">Action</div>
                    </div>
                </div>
                <div className="table-body">
                    {orders.map((order) => (
                        <div key={order.id} className="table-row">
                            <div className="table-cell">{order.details}</div>
                            <div className="table-cell">{order.pickupAddress}</div>
                            <div className="table-cell">{order.deliveryAddress}</div>
                            <div className="table-cell">{order.quantity}</div>
                            <div className="table-cell">{order.weight}</div>
                            <div className={`table-cell status ${order.status === 'DELIVERED' ? 'status-delivered' : 'status-in-progress'}`}>
                                {order.status === "IN_PROGRESS" ? "En cours" : "Livré"}
                            </div>
                            <div className="table-cell">{new Date(order.deliveryDate).toLocaleDateString()}</div>
                            <div className="table-cell">{order.driver.name} - {order.driver.role}</div>
                            <div className="table-cell">
                                <Link href={{
                                    pathname: `/orders/${order.id}`,
                                    query: {
                                        details: order.details,
                                        pickupAddress: order.pickupAddress,
                                        deliveryAddress: order.deliveryAddress,
                                        quantity: order.quantity,
                                        weight: order.weight,
                                        status: order.status,
                                        deliveryDate: order.deliveryDate,
                                        driverName: order.driver.name,
                                        driverRole: order.driver.role
                                    }
                                }}>
                                    Voir
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default OrdersList;
