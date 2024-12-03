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
    // OTHER
    const ordersTypeCh = orders.filter((order) => order.type === "chargement");
    const ordersTypeLv = orders.filter((order) => order.type === "livraison");

 


    const ordersToday = orders.filter((order) => {
        const deliveryDate = new Date(order.deliveryDate);
        const today = new Date();
        return (
            deliveryDate.getFullYear() === today.getFullYear() &&
            deliveryDate.getMonth() === today.getMonth() &&
            deliveryDate.getDate() === today.getDate()
        );
    });

    const driversAvailable = 12;
    const trucksInUse = 25;


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
                ]}
            />

            {/* Aujourd'hui */}
            <Card
                icon={<IoTodaySharp aria-label="Today Icon" />}
                title="Commandes du jour"
                percentage={`${ordersToday.length}`}
                details={[
                    { label: "À livrer", value: ordersTypeLv.length },
                    { label: "À charger", value: ordersTypeCh.length },
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
                title="Camions en cours d'utilisation"
                percentage={`${trucksInUse}`}
                details={[
                    { label: "En transit", value: 15 },
                    { label: "En maintenance", value: 2 },
                ]}
            />




        </div>
    );
}

export default CardDashboard;
