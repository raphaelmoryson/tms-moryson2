import Link from 'next/link';
import React from 'react';
import { FaHome } from "react-icons/fa";
import { MdBedroomParent } from "react-icons/md";
import { FaCalendarCheck } from "react-icons/fa";
import { IoMdPeople } from "react-icons/io";
import { FaFileInvoice } from "react-icons/fa";
import { BiSolidReport } from "react-icons/bi";
import { IoIosSettings } from "react-icons/io";

function Navbar() {
    const navbarLinks = [
        {
            name: "Accueil",
            pathname: "/",
            icon: <FaHome />,
            queryPath: "home",
        },
        {
            name: "Commandes",
            pathname: "/",
            icon: <FaCalendarCheck />,
            queryPath: "orders",
        },
        {
            name: "Véhicules",
            pathname: "/",
            icon: <MdBedroomParent />,
            queryPath: "vehicles",
        },
        {
            name: "Chauffeurs",
            pathname: "/",
            icon: <IoMdPeople />,
            queryPath: "drivers",
        },
        {
            name: "Clients et Facturation",
            pathname: "/",
            icon: <FaFileInvoice />,
            queryPath: "invoices",
        },
        {
            name: "Rapports et Analyses",
            pathname: "/",
            icon: <BiSolidReport />,
            queryPath: "reports",
        },
    ];

    return (
        <div className='navbar_container'>
            <div className='navbar_list'>
                <ul>
                    {navbarLinks.map((link, index) => (
                        <li key={index}>
                            <Link className='navbar_link' href={{
                                pathname: link.pathname,
                                query: { path: link.queryPath }
                            }}>
                                {link.icon}
                                <span>{link.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
