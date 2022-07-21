import React, { useState } from 'react'
import Navbar from './Navbar'


const Layout = ({ children }) => {

    const [theme, setTheme] = useState('light')
    return (
        <div>
            <div>
                <Navbar />
                {children}
            </div>
        </div>
    )
}

export default Layout