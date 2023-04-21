import React from 'react'
import Link from 'next/link'

const Card = ({ title, author, owner, category, timestamp, imageURL, requiredAmount, paperAddress }) => {
    // console.log({ paperAddress })
    return (
        <Link passHref href={"/address/" + paperAddress} >

            <div className="cursor-pointer max-w-sm shadow-2xl shadow-gray-500 dark:shadow-blue-500 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className='max-h-56 overflow-hidden'>
                    <img className="rounded-t-lg object-cover" src={imageURL} alt="thumbnail" />
                </div>
                <div className="p-5 flex flex-col">
                    <div className='flex flex-col justify-center items'>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                        <div className='text-white mb-2 w-fit bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium text-sm px-4 py-2 rounded-full'>{category}</div>
                    </div>
                    <p className="font-bold text-gray-700 dark:text-gray-400">{timestamp}</p>
                    <p className="font-bold  text-gray-700 dark:text-gray-400">{`Required Funds : ` + requiredAmount + ` ETH`}</p>
                    {/* <p className="font-normal text-gray-700 dark:text-gray-400">{description.slice(0, 20) + "..."}</p> */}
                    <div className='flex justify-center items-center'>
                        <div className='grow'>
                            <p className="mb-3 font-bold text-gray-700 dark:text-gray-400">{author}</p>
                        </div>
                        <div className='text-white mb-2 w-fit bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium text-sm px-4 py-2 rounded-full'>
                            {owner.slice(0, 6) + "..."}
                        </div>
                    </div>
                </div>
            </div >
        </Link>
    )
}

export default Card