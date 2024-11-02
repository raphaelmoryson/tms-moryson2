// CardDashboard.js
import React from 'react';
import { MdLocalShipping } from 'react-icons/md'; // Icône de livraison
import { RiFolderInfoFill } from 'react-icons/ri'; // Icône d'information
import { IoTodaySharp } from "react-icons/io5"; // Icône de date
import { FaTruck } from 'react-icons/fa'; // Icône de camion
import Card from '../Card';

function CardDashboard() {
    return (
        <div className='moryson_card_dashboard_container'>
            <Card
                icon={<MdLocalShipping aria-label="Deliveries In Progress Icon" />}
                title="Livraisons en cours"
                percentage="5"
            />
            <Card
                icon={<RiFolderInfoFill aria-label="Total Orders Icon" />}
                title="Total des commandes"
                percentage="120"
            />
            <Card
                icon={<IoTodaySharp aria-label="Deliveries Today Icon" />}
                title="Livraisons d'aujourd'hui"
                percentage="15"
            />
            <Card
                icon={<FaTruck aria-label="Vehicle Utilization Icon" />}
                title="Taux d'utilisation des véhicules"
                percentage="85%"
            />
        </div>
    );
}

export default CardDashboard;
