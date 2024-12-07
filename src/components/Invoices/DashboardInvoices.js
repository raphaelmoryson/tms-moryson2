import React, { useState } from 'react';
import Area from '../Area';
import { FaPrint } from "react-icons/fa";
import { IoMdAdd } from 'react-icons/io';
import { AiOutlineClose } from 'react-icons/ai';

import CreateInvoicesForm from './CreateInvoicesForm';
import InvoicesList from './InvoicesList';



function DashboardInvoices() {
    const [createInvoices, setCreateOrders] = useState(false);

    const buttons = [
        {
            buttonName: "add",
            color: "green",
            action: () => setCreateOrders(!createInvoices),
            content: createInvoices ? <AiOutlineClose aria-label="Hide Create Orders" /> : <IoMdAdd aria-label='Add Order' />,
        },
        {
            buttonName: "print",
            color: "cyan",
            action: () => window.print(),
            content: <FaPrint />
        },
    ];

    return (
        <Area name={"Gestion des Factures"} button={buttons}>
            {createInvoices ? <CreateInvoicesForm/> : <InvoicesList/>}
           
        </Area>
    );
}

export default DashboardInvoices;
