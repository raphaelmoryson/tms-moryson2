import Link from 'next/link'
import React from 'react'

import { FaHome } from "react-icons/fa";
import { MdBedroomParent } from "react-icons/md";
import { FaCalendarCheck } from "react-icons/fa";
import { IoMdPeople } from "react-icons/io";
import { FaFileInvoice } from "react-icons/fa";
import { BiSolidReport } from "react-icons/bi";
import { IoIosSettings } from "react-icons/io";
function Navbar() {
    return (
        <div className='navbar_container'>
            <div className='navbar_list'>
                <ul>
                    <li>
                        <Link href={{
                            pathname: '/',
                            query: { path: 'home' }
                        }}>
                            <FaHome />
                        </Link>
                    </li>
                    <li>
                        <Link href={{
                            pathname: '/',
                            query: { path: 'room' }
                        }}>
                            <MdBedroomParent />
                        </Link>
                    </li>
                    <li>
                        <Link href={{
                            pathname: '/',
                            query: { path: 'reservation' }
                        }}>
                            <FaCalendarCheck />
                        </Link>
                    </li>
                    <li>
                        <Link href={"/"}>
                            <IoMdPeople />
                        </Link>
                    </li>
                    <li>
                        <Link href={"/"}>
                            <FaFileInvoice />
                        </Link>
                    </li>
                    <li>
                        <Link href={"/"}>
                            <BiSolidReport />
                        </Link>
                    </li>
                    <li>
                        <Link href={"/"}>
                            <IoIosSettings />
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar