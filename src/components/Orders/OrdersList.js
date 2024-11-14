import useFetchReducer from '@/useFetchReducer';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import WorkSheetDocument from '@/pages/orders/worksheet/worksheetPDF';

const PDFDownloadLink = dynamic(() => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink), { ssr: false });

function OrdersList() {
    const { data: orders, loading, error } = useFetchReducer('api/orders');
    const [sortCriterion, setSortCriterion] = useState('details');
    const [sortDirection, setSortDirection] = useState('asc');
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');

    useEffect(() => {
        if (orders) {
            const uniqueDrivers = [...new Set(orders.map(order => order.driver.name))];
            setDrivers(uniqueDrivers);
            setFilteredOrders(orders);
        }
    }, [orders]);

    useEffect(() => {
        const filtered = orders.filter(order => {
            const matchesDriver = selectedDriver ? order.driver.name === selectedDriver : true;
            const matchesStatus = selectedStatus ? order.status === selectedStatus : true;
            return matchesDriver && matchesStatus;
        });
        setFilteredOrders(filtered);
    }, [selectedDriver, selectedStatus, orders]);

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p>Error fetching orders: {error}</p>;

    const sortedOrders = [...filteredOrders].sort((a, b) => {
        let aValue, bValue;

        switch (sortCriterion) {
            case 'details':
                aValue = a.details.toLowerCase();
                bValue = b.details.toLowerCase();
                break;
            case 'pickupAddress':
                aValue = a.pickupAddress.toLowerCase();
                bValue = b.pickupAddress.toLowerCase();
                break;
            case 'deliveryAddress':
                aValue = a.deliveryAddress.toLowerCase();
                bValue = b.deliveryAddress.toLowerCase();
                break;
            case 'quantity':
                aValue = parseInt(a.quantity);
                bValue = parseInt(b.quantity);
                break;
            case 'weight':
                aValue = parseFloat(a.weight);
                bValue = parseFloat(b.weight);
                break;
            case 'status':
                aValue = a.status;
                bValue = b.status;
                break;
            case 'deliveryDate':
                aValue = new Date(a.deliveryDate).getTime();
                bValue = new Date(b.deliveryDate).getTime();
                break;
            case 'driverName':
                aValue = a.driver.name.toLowerCase();
                bValue = b.driver.name.toLowerCase();
                break;
            default:
                aValue = a.details;
                bValue = b.details;
                break;
        }

        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    });

    const handleDriverChange = (event) => {
        setSelectedDriver(event.target.value);
    };

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    return (
        <div className="orders-list">

            <div className="filter-controls">
                <label>Filtrer par Chauffeur :</label>
                <select value={selectedDriver} onChange={handleDriverChange}>
                    <option value="">Tous les chauffeurs</option>
                    {drivers.map((driver, index) => (
                        <option key={index} value={driver}>
                            {driver}
                        </option>
                    ))}
                </select>

                <label>Filtrer par Statut :</label>
                <select value={selectedStatus} onChange={handleStatusChange}>
                    <option value="">Tous les statuts</option>
                    <option value="IN_PROGRESS">En cours</option>
                    <option value="DELIVERED">Livré</option>
                </select>
            </div>

            <div className="table">
                <div className="table-header">
                    <div className="table-row">
                        <div className="table-cell">Détails</div>
                        <div className="table-cell">Adresse de Ramassage/Livraison</div>
                        <div className="table-cell">Quantité</div>
                        <div className="table-cell">Poids (kg)</div>
                        <div className="table-cell">Statut</div>
                        <div className="table-cell">Date de Livraison</div>
                        <div className="table-cell">Chauffeur</div>
                        <div className="table-cell">Action</div>
                    </div>
                </div>
                <div className="table-body">
                    {sortedOrders.map((order) => (
                        <div key={order.id} className="table-row">
                            <div className="table-cell">{order.details}</div>
                            <div className="table-cell"><b>{order.pickupAddress}</b> à <b>{order.deliveryAddress}</b></div>

                            <div className="table-cell">{order.quantity} Palettes</div>
                            <div className="table-cell">{order.weight}kg</div>
                            <div className={`table-cell status ${order.status === 'DELIVERED' ? 'status-delivered' : 'status-in-progress'}`}>
                                {order.status === "IN_PROGRESS" ? "En cours" : "Livré"}
                            </div>
                            <div className="table-cell">
                                {order.status == "IN_PROGRESS" && new Date() > new Date(order.deliveryDate) ? <p style={{ fontWeight: "600", color: "red" }}>{new Date(order.deliveryDate).toLocaleDateString()}</p> : <>{new Date(order.deliveryDate).toLocaleDateString()}</>}
                            </div>
                            <div className="table-cell">{order.driver.name}</div>
                            <div className="table-cell" style={{ display: "flex", flexDirection: "column" }}>
                                <Link href={`/orders/${order.id}`}>
                                    Voir
                                </Link>
                                <PDFDownloadLink
                                    document={<WorkSheetDocument orderDetails={order} />}
                                    fileName={`fiche_de_travail_${order.id}.pdf`}>
                                    {({ blob, url, loading, error }) =>
                                        loading ? 'Loading document...' : 'Fiche travail'
                                    }
                                </PDFDownloadLink>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default OrdersList;
