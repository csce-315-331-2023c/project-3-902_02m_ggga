import { useState, useEffect } from 'react'
import './Header.css'

export const Header = () => {

    return (
        <nav className='header'>
            <div className='sharetea_header'>
                ShareTea
            </div>
            <ul className='links'>
                <li onClick={() => handleViewChange('viewOrders')}> View Orders</li>
                <li onClick={() => handleViewChange('placeOrders')}>Place Orders</li>
                <li>Log Out</li>
            </ul>
        </nav>
    )

}