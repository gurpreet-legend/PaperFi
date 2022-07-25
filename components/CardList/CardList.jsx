import React, { useEffect, useContext, useState } from 'react'
import Card from './Card'
import { ServicesContext } from '../../contexts/Services'
import Constants from '../../utils/Constants'
import Tab from './Tab'

const CardList = () => {
    const { Services, contract } = useContext(ServicesContext)
    const [activeCategory, setActiveCategory] = useState("All")
    const [filteredPapers, setFilteredPapers] = useState([])

    const onTabChange = () => {

    }

    const fetchFilteredPapers = async () => {
        let res
        if (activeCategory === "All")
            res = await Services.getAllPublishedPapers()
        else
            res = await Services.getFilteredPublishedPapers(activeCategory)
        // console.log(res)
        if (contract.PaperFi !== null)
            setFilteredPapers(res)
    }

    useEffect(() => {
        fetchFilteredPapers()
    }, [activeCategory, contract.PaperFi])

    return (
        <div>
            <ul className="flex w-full m-auto mb-6 flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                {
                    Constants.CATEGORIES.map((category) => (
                        <li key={category} className="mr-2">
                            <Tab onClick={onTabChange} category={category} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
                        </li>
                    ))
                }
            </ul>
            <div className='grid grid-cols-4 gap-6'>
                {
                    filteredPapers.map((paper) => (
                        <Card
                            key={paper.title}
                            title={paper.title}
                            author={paper.author}
                            owner={paper.owner}
                            requiredAmount={paper.requiredAmount}
                            category={"paper.category"}
                            timestamp={`Published on ${(new Date(paper.timestamp * 1000).toLocaleString()).slice(0, 9)}`}
                            imageURL={`https://ipfs.io/ipfs/${paper.imageURI}`}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default CardList