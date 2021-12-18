import React from 'react'
import classes from '../Header/Header.module.css'
const Header = () => {
    return (
        <header>
            <div className='container'>
                <div className={classes.logo}>
                   Rental App
                </div>
            </div>
        </header>
    )
}

export default Header;
