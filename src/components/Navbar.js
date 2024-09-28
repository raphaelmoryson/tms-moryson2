import Link from 'next/link'
import React from 'react'

import { FaHome } from "react-icons/fa";
import { MdBedroomParent } from "react-icons/md";



function Navbar() {
    return (
        <div className='navbar_container'>
            <div className='navbar_list'>
                <ul>
                    <li>
                        <Link href={"/"}>
                            <FaHome />
                        </Link>
                    </li>
                    <li>
                        <Link href={"/"}>
                            <MdBedroomParent />
                        </Link>
                    </li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar