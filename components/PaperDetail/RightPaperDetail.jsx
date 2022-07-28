import React, { useContext, useState } from 'react'
import Davatar from '@davatar/react'
import { ServicesContext } from '../../contexts/Services'
import { toast } from 'react-toastify'
import { ethers } from 'ethers'
const RightPaperDetail = ({
    title,
    author,
    description,
    image,
    owner,
    paperAddress,
    recievedAmount,
    requiredAmount,
    donations
}) => {
    const [fundAmount, setFundAmount] = useState("")
    // console.log({ fundAmount })
    const { Services } = useContext(ServicesContext)

    const fundTransfer = async () => {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = await provider.getSigner();
        const currWalletAddress = await signer.getAddress()
        if (owner === currWalletAddress) {
            toast.warn("Can't donate to your own paper")
            return
        }
        try {
            await Services.donateFunds(paperAddress, fundAmount)
        }
        catch (err) {
            toast.error("Error while sending funds")
            return
        }
        // toast("Funds transfered successfully")
    }

    return (
        <div className='flex flex-col space-y-3'>
            <h1 className='text-3xl font-bold dark:text-blue-500 text-gray-600'>{title}</h1>
            <div className='flex items-center space-x-2 text-xl font-semibold dark:text-gray-300 text-gray-600'>
                <span>Published by</span>
                <div className='p-2 flex justify-center items-center text-gray-300 text-sm rounded-full bg-blue-500'>
                    <div className='flex space-x-2 justify-center items-center'>
                        <Davatar
                            size={24}
                            address={owner}
                        />
                        <span>{owner}</span>
                    </div>
                </div>
            </div>
            <p className='dark:text-gray-300 font-semibold text-md text-gray-500'>{description}</p>
            <div className='flex flex-col text-xl font-semibold dark:text-gray-300 text-gray-600'>
                <span>Author</span>
                <span className='text text-sm text-gray-500'>{author}</span>
            </div>
            <div className='flex flex-col text-xl font-semibold dark:text-gray-300 text-gray-600'>
                <span>Funders</span>
                <div className='h-[35vh] w-100 overflow-auto space-y-4 rounded-2xl'>
                    {
                        donations.length === 0 ? <div className='p-3 flex items-center space-x-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-2xl'>💰 No Donations Yet</div> :
                            donations.map((d) => (
                                <div key={d.timestamp} className='p-3 flex items-center space-x-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-2xl'>
                                    <Davatar
                                        size={36}
                                        address='0xA33D2770f03db5B2Deb4ff9426E23C3ae62E03C9'
                                    />
                                    <div className='flex flex-col grow'>
                                        <div className='text text-sm text-gray-300'>{d.donar}</div>
                                        <div className='text text-xs text-gray-300'>Funded: {d.amount} ETH</div>
                                    </div>
                                    <div className='text-sm text-white'>{new Date(d.timestamp * 1000).toLocaleDateString()}</div>
                                </div>
                            ))
                    }
                </div>
            </div>
            <div className='p-4 px-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 w-full rounded-3xl'>
                <div className='flex mb-4 items-center text-xl text-gray-300 font-semibold'>
                    <span className='grow'>{recievedAmount + " "}<span className='text-sm'>Funded</span> </span>
                    <span>{requiredAmount + " "}ETH</span>
                </div>
                <div className="w-full mb-8 bg-gray-200  rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-gradient-to-r from-blue-700 to-purple-600 h-2.5 rounded-full" style={{ width: `${(parseFloat(recievedAmount) / parseFloat(requiredAmount)) * 100}%` }}></div>
                    <div className="text-gray-300 text-lg">{(parseFloat(recievedAmount) / parseFloat(requiredAmount)) * 100}%</div>
                </div>
                <div className='flex justify-center'>
                    <input onChange={(e) => setFundAmount(e.target.value)} className='bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Enter the amount in ETH'></input>
                    <button onClick={fundTransfer} type="button" className="text-gray-300 uppercase bg-gradient-to-r from-purple-700 to-pink-600 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-2xl ml-2 text-sm px-5 py-2.5 text-center">
                        Fund the Research Paper
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RightPaperDetail