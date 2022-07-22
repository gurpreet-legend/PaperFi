import React, { useState } from 'react'
import Navbar from './Navbar'


const Layout = ({ children }) => {

    const [theme, setTheme] = useState('light')
    return (
        <div className='dark:bg-slate-900 h-screen'>
            <Navbar />
            {children}
        </div>
    )
}

export default Layout