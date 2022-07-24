import React, { useState } from 'react'
import { FormContext } from '../../contexts/FormContext'
import { useContext } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { create } from 'ipfs-http-client'
import { IpfsContext } from '../../contexts/IpfsContext'
import { toast } from 'react-toastify'

const LeftFormWrapper = () => {


    const ipfs = create("https://ipfs.infura.io:5001/api/v0")

    const { thumbnail, pdfFile, fileHandler, imageHandler } = useContext(FormContext)

    const { updateIpfsData, thumbnailURL, pdfFileURL } = useContext(IpfsContext)

    const [uploadLoading, setUploadLoading] = useState(false)
    const [uploaded, setUploaded] = useState(false)


    const uploadFileHandler = async (e) => {
        e.preventDefault()
        setUploadLoading(true)

        if (
            thumbnail === null ||
            pdfFile === null
        ) {
            toast.warn("Upload some valid files")
            setUploadLoading(false)
            return
        } else {
            //thumbnail upload
            let thumbnailRes, pdfFileRes
            try {
                thumbnailRes = await ipfs.add(thumbnail)
                console.log()
            }
            catch {
                toast.error("Error Uploading thumbnail")
                setUploadLoading(false)
                return
            }
            //pdf upload
            try {
                pdfFileRes = await ipfs.add(pdfFile)
            }
            catch {
                toast.error("Error Uploading PDF file")
                setUploadLoading(false)
                return
            }
            updateIpfsData({ thumbnailURL: thumbnailRes.path, pdfFileURL: pdfFileRes.path })
        }
        setUploadLoading(false)
        setUploaded(true)
        toast.success("Files uploaded successfully")
    }

    return (
        <div>
            <div className='m-6  h-[35vh] p-6 pb-10 flex flex-col justify-center items-center rounded-3xl border-dashed border-4 border-blue-700 dark:border-blue-500'>
                <div className="mt-1 text-2xl text-blue-700 dark:text-blue-500 font-semibold">Upload PDF</div>
                <label className="flex bg-blue-400 justify-center w-fit p-4 px-8 rounded-full cursor-pointer text-blue-700 m-6 dark:text-black underline" htmlFor="fileInput">{pdfFile == null ? 'Choose file' : pdfFile.name.slice(0, 20) + '...'}</label>
                <input onChange={fileHandler} className='hidden' aria-describedby="user_avatar_help" id="fileInput" type="file" accept="application/pdf" />
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="fileInput">Supports .pdf file format</div>
            </div>
            <div className='m-6  h-[35vh] p-6 pb-10 flex flex-col justify-center items-center rounded-3xl border-dashed border-4 border-blue-700 dark:border-blue-500'>
                <div className="mt-1 text-2xl text-blue-700 dark:text-blue-500 font-semibold">Upload thumbnail</div>
                <label className="flex bg-blue-400 justify-center w-fit p-4 px-8 rounded-full cursor-pointer text-blue-700 m-6 dark:text-black underline" htmlFor="imageInput">{thumbnail == null ? 'Choose image' : thumbnail.name.slice(0, 20) + '...'}</label>
                <input onChange={imageHandler} className='hidden' aria-describedby="user_avatar_help" id="imageInput" type="file" accept="image/jpg, image/jpeg, image/png" />
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="imageInput">Supports .png .jgg .jpeg file format</div>
            </div>
            <div className='flex w-full justify-center items-center mb-10'>
                {
                    uploadLoading === true ?
                        <button type="button" className="flex text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">
                            <TailSpin
                                height="10"
                                width="10"
                                color='white'
                                ariaLabel='loading'
                            />
                        </button> :
                        uploaded === true ?
                            <button type="button" className="flex cursor-no-drop text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">
                                Files uploaded to IPFS
                            </button> :

                            <button onClick={uploadFileHandler} type="button" className="flex text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">
                                <span className='text-white font-bold text-lg'>Upload files to IPFS</span>
                            </button>
                }
            </div>
        </div>
    )
}

export default LeftFormWrapper