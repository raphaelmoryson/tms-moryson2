import React, { useState } from 'react'
import Area from '../Area'
import { FaPrint } from "react-icons/fa";
import { IoMdAdd } from 'react-icons/io';
import { AiOutlineClose } from 'react-icons/ai';
function DashboardInvoices() {
    const [createInvoices, setCreateOrders] = useState(false)
    let button = [
        {
            buttonName: "add",
            color: "green",
            action: () => { setCreateOrders(!createInvoices) },
            content: createInvoices ? <AiOutlineClose aria-label="Hide Create Orders" /> : <IoMdAdd aria-label='Close Create orders' />,

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
        <Area name={"Gestions des factures"} button={button}>
            {/* {createInvoices == true ? <CreateInvoices /> : <InvoicesList />} */}

        </Area>
    )
}

export default DashboardInvoices