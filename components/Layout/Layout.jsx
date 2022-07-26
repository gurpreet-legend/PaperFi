import React, { useState } from 'react'
import Navbar from './Navbar'
import Head from 'next/head'


const Layout = ({ children }) => {
    return (
        <div className='dark:bg-slate-900 h-screen'>
            <Head>
                <title>PaperFi</title>
                <meta name="description" content="One stop solution to get your papers funded" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            {children}
        </div>
    )
}

export default Layout