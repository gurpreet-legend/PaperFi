import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState, useEffect, useRef, useContext } from 'react'
import classNames from '../../utils/classNames'
import { MoonIcon, SunIcon } from '@heroicons/react/solid'
import { useTheme } from "next-themes"
import Wallet from '../Wallet/Wallet'
import { SearchFilterContext } from '../../contexts/SearchFilter'

const navigations = [
    {
        tag: 'Home',
        href: '/'
    },
    {
        tag: 'Publish',
        href: '/publish'
    },
]


const Navbar = () => {
    const { searchText, updateSearchText } = useContext(SearchFilterContext)

    const [mounted, setMounted] = useState(false)
    const { setTheme, theme } = useTheme()
    let router = useRouter()
    const toggleEl = useRef()

    useEffect(() => {
        setMounted(true)
        setTheme('dark')
    }, [])
    if (!mounted) return null


    const onThemeToggler = () => {
        toggleEl.current.checked == false ? setTheme('dark') : setTheme('light')
    }

    const searchPapers = (e) => {
        updateSearchText(e.target.value)
        console.log({ searchText })
    }

    return (
        <div>
            <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
                <div className="container flex flex-wrap justify-between items-center mx-auto">
                    {/* Logo: */}
                    <Link href="/">
                        <div className="flex items-center">
                            <img src="/logo.png" className="mr-3 h-6 sm:h-9" alt="PaperFi Logo" />
                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">PaperFi</span>
                        </div>
                    </Link>
                    {/* Search  */}
                    <div className="flex ">
                        <div className="hidden relative md:block">
                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Search icon</span>
                            </div>
                            <input onChange={searchPapers} type="text" id="search-navbar" className="block outline-none p-2 pl-10 w-[40vw] text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
                        </div>
                    </div>
                    <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="navbar-search">
                        {/* <div className="relative mt-3 md:hidden w-full">
                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                            </div>
                            <input type="text" id="search-navbar" className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
                        </div> */}
                        {/* Navigations  */}
                        <ul className="flex justify-center items-center flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                            {
                                navigations.map((nav) => (
                                    <li key={nav.tag}>
                                        <Link href={nav.href} className="block" aria-current="page">
                                            <span className={
                                                classNames(router.pathname === nav.href ? ` text-blue-700 bg-blue-700 rounded md:bg-transparent md:p-0 dark:text-white` :
                                                    `text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`, 'py-2 pr-4 pl-3 cursor-pointer')
                                            }>
                                                {nav.tag}
                                            </span>
                                        </Link>
                                    </li>
                                ))
                            }
                            {/* Connect Button */}
                            <li >
                                <Wallet />
                            </li>
                        </ul>
                        {/* toggler */}
                        <div className='flex justify-center items-center'>
                            <SunIcon className='h-5 w-5 text-blue-700 dark:text-white ml-6 mr-2' />
                            <label htmlFor="default-toggle" className="inline-flex relative items-center cursor-pointer">
                                <input type="checkbox" ref={toggleEl} onClick={onThemeToggler} value="" id="default-toggle" className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span className='ml-5 text-sm font-medium text-gray-900 dark:text-gray-300'></span>
                            </label>
                        </div>
                    </div>
                </div>
            </nav >
        </div >


    )
}

export default Navbar