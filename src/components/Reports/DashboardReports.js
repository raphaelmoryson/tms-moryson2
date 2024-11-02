import React from 'react'
import Area from '../Area'
import { FaPrint } from "react-icons/fa";
function DashboardReports() {
    let button = [
        {
            buttonName: "add",
            color: "green",
            action: null,
            content: "+"
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
        <Area name={"Gestions des Rapports et analyses"} button={button}>
        </Area>
    )
}

export default DashboardReports