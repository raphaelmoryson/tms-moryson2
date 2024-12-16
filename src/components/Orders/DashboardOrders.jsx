import React, { useEffect, useReducer, useState } from 'react'
import { FaPrint } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'; // Importing an icon for closing
import Area from '../Area'
import CreateOrdersForm from './CreateOrdersForm'
import { IoMdAdd } from "react-icons/io";
import OrdersList from './OrdersList';
import useFetchReducer from '@/useFetchReducer';

function DashboardOrders() {
    const [createOrders, setCreateOrders] = useState(false)
    const { data: drivers, loading, error } = useFetchReducer('api/drivers')

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p>Error fetching orders: {error}</p>;

    const toggleCreateOrders = () => {
        setCreateOrders(prev => !prev);
    };

    const button = [
        {
            buttonName: "add",
            color: "green",
            action: toggleCreateOrders,
            content: createOrders ? <AiOutlineClose aria-label="Hide Create Orders" /> : <IoMdAdd aria-label='Close Create orders' />,
        },
        {
            buttonName: "delete",
            color: "red",
            action: null,
            content: "x",
        },
        {
            buttonName: "print",
            color: "cyan",
            action: null,
            content: <FaPrint aria-label="Print Orders" />,
        },
    ];

    return (
        <Area name={"Gestion des Commandes"} button={button}>
            {createOrders ? <CreateOrdersForm driversList={drivers} /> : <OrdersList />}
        </Area>
    );
}

export default DashboardOrders;
