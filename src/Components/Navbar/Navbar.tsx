import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../../assets/disney.png'

import { Account } from '../../../graphql'

interface NavbarProps {
    account: Account
}


const Navbar = ({ account }: NavbarProps) => {
    return (
        <div className="navbar">
            <Link to="/">
                <img src={logo} alt="Disney Logo" style={{ width: 90, height: 50 }} />
            </Link>
            <div className="account-info">
                <p>Welcome {account.username}</p>
                <img className="avatar" src={account.avatar.url} />
            </div>
        </div>
    )
}

export default Navbar