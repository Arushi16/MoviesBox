import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className='nav'>
            <ul className='navStyle'>
                <Link to='/' className='link'>
                    <li>H.O.M.E.</li>
                </Link>
            </ul>
        </nav>
    )
}