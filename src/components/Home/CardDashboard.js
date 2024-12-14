import React from 'react';
import { MdLocalShipping } from 'react-icons/md';
import { RiFolderInfoFill } from 'react-icons/ri';
import { IoTodaySharp } from "react-icons/io5";
import { FaTruckLoading, FaWarehouse, FaRoute } from "react-icons/fa";
import Card from '../Card';
import useFetchReducer from '@/useFetchReducer';
import { MdAttachMoney } from "react-icons/md";
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


    function formatEuro(amount) {
        if (typeof amount !== 'number') {
            throw new Error('Le montant doit être un nombre');
        }
    
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR'
        }).format(amount);
    }
    

    return (
        <div>
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
            <div className='moryson_card_dashboard_container' style={{marginTop :"10px"}}>
                <Card
                    icon={<MdAttachMoney aria-label="Trucks Icon" />}
                    title="C.A"
                    details={[
                        { label: "Mensuel", value: formatEuro(100000) },
                        { label: "Annuel", value: formatEuro(1000000) },
                    ]}
                />

            </div>
        </div>


    );
}

export default CardDashboard;
