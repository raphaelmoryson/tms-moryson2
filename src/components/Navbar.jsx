import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import {
    FaHome, FaCalendarCheck, FaFileInvoice,
} from "react-icons/fa";
import { MdBedroomParent } from "react-icons/md";
import { IoMdPeople } from "react-icons/io";
import { BiSolidReport } from "react-icons/bi";
import { BsFillFileEarmarkPersonFill } from "react-icons/bs";

import logo from '@/images/logo.png';

function Navbar({ children }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const router = useRouter();

    const navbarLinks = [
        { name: "Accueil", pathname: "/", icon: <FaHome />, queryPath: "home" },
        { name: "Commandes", pathname: "/", icon: <FaCalendarCheck />, queryPath: "orders" },
        { name: "Véhicules", pathname: "/", icon: <MdBedroomParent />, queryPath: "vehicles" },
        { name: "Chauffeurs", pathname: "/", icon: <IoMdPeople />, queryPath: "drivers" },
        { name: "Facturation", pathname: "/", icon: <FaFileInvoice />, queryPath: "invoices" },
        { name: "Clients", pathname: "/", icon: <BsFillFileEarmarkPersonFill />, queryPath: "customers" },
        { name: "Rapports", pathname: "/", icon: <BiSolidReport />, queryPath: "reports" },
    ];

    return (
        <div className="layout">
            <div className={`sidebar_container ${isCollapsed ? "collapsed" : ""}`}>
                <div className="sidebar_header">
                    <div className="logo">
                        {isCollapsed ?  undefined : <Image src={logo} alt="Logo" width={150} height={60} />}
                    </div>
                    <button
                        className={`collapse_btn ${isCollapsed ? 'collapsed-true' : 'collapsed-false'}`}
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                        {isCollapsed ? "►" : "◄"}
                    </button>
                </div>

                <ul className="sidebar_list">
                    {navbarLinks.map((link, index) => (
                        <li
                            key={index}
                            className={`sidebar_item ${router.query.path === link.queryPath ? "active" : ""}`}
                        >
                            <Link
                                href={{
                                    pathname: link.pathname,
                                    query: { path: link.queryPath }
                                }}
                                className="sidebar_link"
                            >
                                {link.icon}
                                {!isCollapsed && <span>{link.name}</span>}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

                {children}
        </div>
    );
}

export default Navbar;
