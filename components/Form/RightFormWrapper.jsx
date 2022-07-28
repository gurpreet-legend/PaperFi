import React, { useState } from 'react'
import { FormContext } from '../../contexts/FormContext'
import { useContext } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { create } from 'ipfs-http-client'
import { IpfsContext } from '../../contexts/IpfsContext'
import { toast } from 'react-toastify'
import { ServicesContext } from '../../contexts/Services'
import { ethers } from 'ethers'
import PublishedModal from '../Modals/PublishedModal'


const RightFormWrapper = () => {

    const { inputHandler, description, author, title, requiredAmount, category, thumbnail, pdfFile } = useContext(FormContext)
    const { thumbnailURL, pdfFileURL } = useContext(IpfsContext)
    const { Services } = useContext(ServicesContext)

    const [publishLoading, setPublishLoading] = useState(false)
    const [published, setPublished] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [address, setAddress] = useState("")

    const formSubmitHandler = async (e) => {
        e.preventDefault()
        setPublishLoading(true)

        if (
            title === "" ||
            author === "" ||
            description === "" ||
            requiredAmount === "" ||
            category === "" ||
            thumbnail === null ||
            pdfFile === null
        ) {
            toast.warn("Empty string not allowed")
            setPublishLoading(false)
            return
        } else {

            //publish paper
            try {
                // let fundAmount = ethers.utils.parseEther(requiredAmount);
                let intRequiredAmount = parseInt(requiredAmount)
                let publishedAddress = await Services.publishPaper(
                    title,
                    author,
                    intRequiredAmount,
                    thumbnailURL,
                    pdfFileURL,
                    category,
                    description
                )
                console.log(publishedAddress)
                setAddress(publishedAddress)
            }
            catch (err) {
                console.log(err)
                toast.error("Error while publishing paper")
                setPublishLoading(false)
                return
            }
        }
        setPublishLoading(false)
        setPublished(true)
        toast("Files published successfully")
        setOpenModal(true)
    }

    return (
        <div className='flex flex-col space-y-6 p-6'>
            {
                setPublishLoading === true ? "" :
                    setPublished === false ? "" :
                        address === "" ? "" :
                            openModal ? <PublishedModal setOpenModal={setOpenModal} address={address} /> : ""
            }
            <div>
                <label htmlFor="title" className="block mb-2 placeholder:font-mono text-lg font-medium text-gray-900 dark:text-blue-300">Title</label>
                <input onChange={inputHandler} name="title" type="text" id="title" placeholder='Bitcoin: A Peer-to-Peer Electron...' className="block outline-none p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div>
                <label htmlFor="author" className="block mb-2 placeholder:font-mono text-lg font-medium text-gray-900 dark:text-blue-300">Author</label>
                <input onChange={inputHandler} name="author" type="text" id="author" placeholder='Satoshi Nakamoto...' className="block outline-none p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div>
                <label htmlFor="desc" className="block mb-2 placeholder:font-mono text-lg font-medium text-gray-900 dark:text-blue-300">Description</label>
                <textarea onChange={inputHandler} name="description" type="text" id="desc" placeholder='Electronic transaction system...' className="block outline-none p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div>
                <label htmlFor="categories" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select your country</label>
                <select onChange={inputHandler} name="category" id="categories" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="Science">🔬 Science</option>
                    <option value="ML/AI">🤖 ML/AI</option>
                    <option value="Space">🚀 Space</option>
                    <option value="Medical">💊 Medical</option>
                    <option value="Economics">💸 Economics</option>
                    <option value="White Paper">📜 White Paper</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div className='flex'>
                <span className='text-xl text-blue-700 dark:text-blue-500 font-semibold grow h-10'>Funding Amount</span>
                <input onChange={inputHandler} name="requiredAmount" type="number" placeholder='0 ETH' className='bg-blue-400 outline-none focus:ring-1 focus:ring-blue-700 p-2 text-black placeholder:text-blue-700 rounded-md text-center h-10' />
            </div>
            <div>
                <p className='text-sm text-gray-600 dark:text-blue-500 mb-3'>
                    Once your NFT is minted on the blockchain, you will not be able to edit or update any of its information.
                </p>
                <p className='text-sm text-gray-600 dark:text-blue-500'>
                    You agree that any information published to the PaperiFi will not contain material subject to copyright or other proprietary rights, unless you have necessary permission or are otherwise legally entitled to post the material.
                </p>
            </div>
            <div>
                {
                    publishLoading === true ?
                        <button type="button" className="flex text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">
                            <TailSpin
                                height="10"
                                width="10"
                                color='white'
                                ariaLabel='loading'
                            />
                        </button> :
                        published === true ?
                            <button type="button" className="flex cursor-no-drop text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">
                                Paper Published
                            </button> :

                            <button onClick={formSubmitHandler} type="button" className="flex text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">
                                <span className='text-white font-bold text-lg'>Publish</span>
                            </button>
                }
            </div>

        </div>
    )
}

export default RightFormWrapper