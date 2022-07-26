import React from 'react'
import Davatar from '@davatar/react'

const RightPaperDetail = () => {
    return (
        <div className='flex flex-col space-y-3'>
            <h1 className='text-3xl font-bold dark:text-blue-500 text-gray-600'>Title</h1>
            <div className='flex items-center space-x-2 text-xl font-semibold dark:text-gray-300 text-gray-600'>
                <span>Published by</span>
                <div className='p-2 flex justify-center items-center text-gray-300 text-sm rounded-full bg-blue-500'>
                    <div className='flex space-x-2 justify-center items-center'>
                        <Davatar
                            size={24}
                            address='0xA33D2770f03db5B2Deb4ff9426E23C3ae62E03C9'
                        />
                        <span>{"0X7497498724979".slice(0, 6) + "..."}</span>
                    </div>
                </div>
            </div>
            <p className='dark:text-gray-300 font-semibold text-md text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, in libero. Natus aliquid mollitia exercitationem nemo ratione placeat, odit magnam earum eius illum quis esse consectetur voluptatem minus repellendus, nostrum voluptatibus quasi.</p>
            <div className='flex flex-col text-xl font-semibold dark:text-gray-300 text-gray-600'>
                <span>Author</span>
                <span className='text text-sm text-gray-500'>Satoshi Nakamoto</span>
            </div>
            <div className='flex flex-col text-xl font-semibold dark:text-gray-300 text-gray-600'>
                <span>Funders</span>
                <div className='h-[35vh] w-100 overflow-auto space-y-4 rounded-2xl'>
                    <div className='p-3 flex items-center space-x-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-2xl'>
                        <Davatar
                            size={36}
                            address='0xA33D2770f03db5B2Deb4ff9426E23C3ae62E03C9'
                        />
                        <div className='flex flex-col'>
                            <div className='text text-sm text-gray-300'>0x000000000</div>
                            <div className='text text-xs text-gray-300'>Funded: 3 ETH</div>
                        </div>
                    </div>

                </div>
            </div>
            <div className='p-4 px-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 w-full rounded-3xl'>
                <div className='flex mb-4 items-center text-xl text-gray-300 font-semibold'>
                    <span className='grow'>0.5 ETH  <span className='text-sm'>Funded</span> </span>
                    <span>1 ETH</span>
                </div>
                <div className="w-full mb-8 bg-gray-200  rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-gradient-to-r from-blue-700 to-purple-600 h-2.5 rounded-full" style={{ width: "45%" }}></div>
                    <div className="text-gray-300 text-lg">45%</div>
                </div>
                <div className='flex justify-center'>
                    <button type="button" className="text-gray-300 uppercase bg-gradient-to-r from-purple-700 to-pink-600 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center">
                        Fund the Research Paper
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RightPaperDetail