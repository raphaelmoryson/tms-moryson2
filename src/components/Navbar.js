import Link from 'next/link';
import React from 'react';
import { FaHome } from "react-icons/fa";
import { MdBedroomParent } from "react-icons/md";
import { FaCalendarCheck } from "react-icons/fa";
import { IoMdPeople } from "react-icons/io";
import { FaFileInvoice } from "react-icons/fa";
import { BiSolidReport } from "react-icons/bi";
import { BsFileEarmarkPersonFill, BsFillFileEarmarkPersonFill } from "react-icons/bs";

import Image from 'next/image';

import logo from '@/images/logo.png'
import { useRouter } from 'next/router';

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
            name: "Facturation",
            pathname: "/",
            icon: <FaFileInvoice />,
            queryPath: "invoices",
        },
        {
            name: "Clients",
            pathname: "/",
            icon: <BsFillFileEarmarkPersonFill />,
            queryPath: "customers",
        },
        {
            name: "Rapports et Analyses",
            pathname: "/",
            icon: <BiSolidReport />,
            queryPath: "reports",
        },
    ];
    const router = useRouter()
    return (
        <div className='navbar_container'>
            <div className='navbar_list'>
                <div className='logo'>
                    <Image src={logo} alt='' />
                </div>
                <ul>
                    {navbarLinks.map((link, index) => (
                        <li key={index} className={`${router.query.path == link.queryPath ? "active" : ""}`}>
                            <Link className={`navbar_link`} href={{
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
