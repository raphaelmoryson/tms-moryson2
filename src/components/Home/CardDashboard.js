import React from 'react';
import { MdLocalShipping } from 'react-icons/md';
import { RiFolderInfoFill } from 'react-icons/ri';
import { IoTodaySharp } from "react-icons/io5";
import { FaTruckLoading, FaWarehouse, FaRoute } from "react-icons/fa";
import Card from '../Card';
import useFetchReducer from '@/useFetchReducer';

function CardDashboard() {
    const { data: orders, loading, error } = useFetchReducer('api/orders');
    const ordersInProgress = orders.filter((order) => order.status === "IN_PROGRESS");
    const ordersDelivred = orders.filter((order) => order.status === "DELIVERED");
    const ordersCompleted = orders.filter((order) => order.status === "COMPLETED");
    const ordersToday = orders.filter((order) => {
        const deliveryDate = new Date(order.deliveryDate);
        const today = new Date();
        return (
            deliveryDate.getFullYear() === today.getFullYear() &&
            deliveryDate.getMonth() === today.getMonth() &&
            deliveryDate.getDate() === today.getDate()
        );
    });

    // Données fictives pour l'exemple :
    const driversAvailable = 12;
    const trucksInUse = 25;
    const pendingShipments = 18;
    const warehousesOccupied = 3;

    return (
        <div className='moryson_card_dashboard_container'>
            {/* Commandes */}
            <Card
                icon={<RiFolderInfoFill aria-label="Orders Icon" />}
                title="Commandes"
                percentage={`${orders.length}`}
                details={[
                    { label: "En cours", value: ordersInProgress.length },
                    { label: "Livrées", value: ordersDelivred.length },
                    { label: "Terminées", value: ordersCompleted.length },
                ]}
            />

            {/* Aujourd'hui */}
            <Card
                icon={<IoTodaySharp aria-label="Today Icon" />}
                title="Commandes du jour"
                percentage={`${ordersToday.length}`}
                details={[
                    { label: "À livrer", value: ordersToday.length },
                ]}
            />

            {/* Chauffeurs disponibles */}
            <Card
                icon={<FaTruckLoading aria-label="Drivers Icon" />}
                title="Chauffeurs disponibles"
                percentage={`${driversAvailable}`}
                details={[
                    { label: "Chauffeurs en mission", value: driversAvailable - 8 },
                    { label: "Total chauffeurs", value: driversAvailable + 8 },
                ]}
            />

            {/* Camions en cours d'utilisation */}
            <Card
                icon={<MdLocalShipping aria-label="Trucks Icon" />}
                title="Camions en cours"
                percentage={`${trucksInUse}`}
                details={[
                    { label: "En transit", value: 15 },
                    { label: "En maintenance", value: 2 },
                ]}
            />

            {/* Entrepôts */}
            <Card
                icon={<FaWarehouse aria-label="Warehouses Icon" />}
                title="Entrepôts"
                percentage={`${warehousesOccupied}`}
                details={[
                    { label: "Entrepôts pleins", value: warehousesOccupied },
                    { label: "Capacité totale", value: 10 },
                ]}
            />

            {/* Expéditions en attente */}
            <Card
                icon={<FaRoute aria-label="Pending Shipments Icon" />}
                title="Expéditions en attente"
                percentage={`${pendingShipments}`}
                details={[
                    { label: "En attente de chargement", value: 12 },
                    { label: "En attente de validation", value: 6 },
                ]}
            />
        </div>
    );
}

export default CardDashboard;
