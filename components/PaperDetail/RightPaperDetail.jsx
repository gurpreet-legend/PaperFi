import React, { useContext, useEffect, useState } from 'react'
import Davatar from '@davatar/react'
import { ServicesContext } from '../../contexts/Services'
import { toast } from 'react-toastify'
import { ethers } from 'ethers'
import { ExternalLinkIcon } from "@heroicons/react/outline"
import { TailSpin } from 'react-loader-spinner'
import Link from 'next/link'

const RightPaperDetail = ({
    title,
    author,
    description,
    image,
    owner,
    paperAddress,
    recievedAmount,
    requiredAmount,
    purchaseAmount,
    donations
}) => {
    const [fundAmount, setFundAmount] = useState("")
    const [purchased, setPurchased] = useState(false)
    const [assets, setAssets] = useState("")
    const [currWalletAddress, setCurrWalletAddress] = useState("")
    const [purchaseLoader, setPurchaseLoader] = useState(false)
    // console.log({ fundAmount })
    const { Services } = useContext(ServicesContext)

    // const fetchCurrWalletAddress = async () => {
    //     await window.ethereum.request({ method: 'eth_requestAccounts' });
    //     const provider = new ethers.providers.Web3Provider(window.ethereum);
    //     const signer = await provider.getSigner();
    //     const currAddress = await signer.getAddress()
    //     setCurrWalletAddress(currAddress)
    //     console.log(currWalletAddress)
    // }
    const getAssets = async () => {
        const assetRes = await Services.getAssets(paperAddress)
        setAssets(assetRes)
    }

    const checkPurchased = async () => {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = await provider.getSigner();
        const currWalletAddress = await signer.getAddress()
        const isPurchased = await Services.isPurchased(paperAddress, currWalletAddress)
        if (isPurchased === true || currWalletAddress === owner) {
            await getAssets()
            setPurchased(isPurchased)
        } else if (currWalletAddress !== owner) {
            setPurchased(isPurchased)
        }
    }
    useEffect(() => {
        // fetchCurrWalletAddress()
        checkPurchased()
        // getAssets()
    }, [])

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

    const purchaseAssets = async () => {
        setPurchaseLoader(true)
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = await provider.getSigner();
        const currWalletAddress = await signer.getAddress()
        if (owner === currWalletAddress) {
            toast.warn("Can't purchase your own assets")
            return
        }
        try {
            await Services.purchaseAssets(paperAddress, purchaseAmount)
            await getAssets()
            setPurchased(true)
        }
        catch (err) {
            toast.warn("Error while purchasing assets")
            return
        }
        setPurchaseLoader(false)
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
                            address={owner || "0x22F138545695d4495449f4D137f53B03871954dD"}
                        />
                        <span>{owner}</span>
                    </div>
                </div>
            </div>
            <p className='dark:text-gray-400 pb-2 text-md text-gray-500'>{description}</p>
            <div className='grid grid-cols-2'>
                <div className='flex flex-col text-xl font-semibold dark:text-gray-300 text-gray-600'>
                    <span>Author</span>
                    <span className='text text-sm text-gray-500'>{author}</span>
                </div>
                {

                    purchaseLoader === true ?
                        <button className='flex flex-col justify-center items-center cursor-pointer text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 '>
                            <TailSpin
                                height="20"
                                width="20"
                                color='white'
                                ariaLabel='loading'
                            />
                        </button> :
                        purchased === true && assets !== "" ?
                            <a href={`${process.env.NEXT_PUBLIC_IPFS_GATEWAY}/ipfs/${assets}`} target="_blank">
                                <div className='flex flex-row justify-center cursor-pointer items-center bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-2xl p-2 text-white'>
                                    <span className='mr-2'>Assets already purchased</span>
                                    <ExternalLinkIcon className='h-6 w-6' />

                                </div>
                            </a> :
                            <button onClick={purchaseAssets} className='flex flex-col justify-center items-center cursor-pointer text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 '>
                                <span>🔓 Unlock Assets for {purchaseAmount} GWEI</span>
                                {/* <span className='text text-sm text-gray-500'>{purchaseAmount}</span> */}
                            </button>
                }

            </div>
            <div className='flex flex-col text-xl font-semibold dark:text-gray-300 text-gray-600'>
                <span>Funders</span>
                <div className='h-[32vh] w-100 overflow-auto space-y-4 rounded-2xl'>
                    {
                        donations.length === 0 ? <div className='p-3 flex items-center space-x-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-2xl'>💰 No Donations Yet</div> :
                            donations.map((d) => (
                                <div key={d.timestamp} className='p-3 flex items-center space-x-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-2xl'>
                                    <Davatar
                                        size={36}
                                        address={owner || "0x22F138545695d4495449f4D137f53B03871954dD"}
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
                    <button onClick={() => fundTransfer()} type="button" className="text-gray-300 uppercase bg-gradient-to-r from-purple-700 to-pink-600 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-2xl ml-2 text-sm px-5 py-2.5 text-center">
                        Fund the Research Paper
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RightPaperDetail