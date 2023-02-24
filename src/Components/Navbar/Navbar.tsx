import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../../assets/disney.png'

const Navbar = () => {
    return (
        <div className="navbar">
            <Link to="/">
                <img src={logo} alt="Disney Logo" style={{width: 90, height: 50}}/>
            </Link>
        </div>
    )
}

export default Navbar