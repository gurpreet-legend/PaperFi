import React, { useState } from 'react'

const Tab = ({ category, activeCategory, setActiveCategory }) => {
    // const [activeCategory, setActiveCategory] = useState("")

    // useEffect(() => {
    //     if(activeCategory === "ALL")
    //         setActiveCategory(category)
    // }, [])

    const onTabClickHandler = () => {
        setActiveCategory(category)
        console.log(activeCategory)
    }

    return (
        <div onClick={onTabClickHandler} className={
            activeCategory === category ?
                `inline-block cursor-pointer py-3 px-4 text-white bg-blue-600 rounded-lg active` :
                `inline-block cursor-pointer py-3 px-4 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white`
        }
            aria-current="page">
            {category}
        </div>
    )
}

export default Tab