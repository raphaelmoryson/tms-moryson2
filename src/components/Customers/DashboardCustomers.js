import React, { useState } from 'react'
import Area from '../Area'
import { FaPrint } from "react-icons/fa";
import CreateCustomers from './CreateCustomers';
import CustomersList from './CustomersList';
import { AiOutlineClose } from 'react-icons/ai';
import { IoMdAdd } from 'react-icons/io';

function DashboardCustomers() {
    const [createCustomers, setCreateOrders] = useState(false)
    let button = [
        {
            buttonName: "add",
            color: "green",
            action: () => { setCreateOrders(!createCustomers) },
            content: createCustomers ? <AiOutlineClose aria-label="Hide Create Orders" /> : <IoMdAdd aria-label='Close Create orders' />,

        },
        {
            buttonName: "delete",
            color: "red",
            action: null,
            content: "x"
        },
        {
            buttonName: "print",
            color: "cyan",
            action: null,
            content: <FaPrint />
        },
    ]
    return (
        <Area name={"Gestions des clients"} button={button}>
            {createCustomers == true ? <CreateCustomers /> : <CustomersList />}
        </Area>
    )
}

export default DashboardCustomers