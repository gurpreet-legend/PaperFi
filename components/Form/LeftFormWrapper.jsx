import React from 'react'
import { FormContext } from '../../contexts/FormContext'
import { useContext } from 'react'

const LeftFormWrapper = () => {

    const { pdfFile, thumbnail, imageHandler, fileHandler } = useContext(FormContext)

    return (
        <div>
            <div className='m-6  h-[40vh] p-6 pb-10 flex flex-col justify-center items-center rounded-3xl border-dashed border-4 border-blue-700 dark:border-blue-500'>
                <div className="mt-1 text-2xl text-blue-700 dark:text-blue-500 font-semibold">Upload PDF</div>
                <label className="flex bg-blue-400 justify-center w-fit p-4 px-8 rounded-full cursor-pointer text-blue-700 m-6 dark:text-black underline" htmlFor="fileInput">{pdfFile == null ? 'Choose file' : pdfFile.name.slice(0, 20) + '...'}</label>
                <input onChange={fileHandler} className='hidden' aria-describedby="user_avatar_help" id="fileInput" type="file" accept="application/pdf" />
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="fileInput">Supports .pdf file format</div>
            </div>
            <div className='m-6  h-[40vh] p-6 pb-10 flex flex-col justify-center items-center rounded-3xl border-dashed border-4 border-blue-700 dark:border-blue-500'>
                <div className="mt-1 text-2xl text-blue-700 dark:text-blue-500 font-semibold">Upload thumbnail</div>
                <label className="flex bg-blue-400 justify-center w-fit p-4 px-8 rounded-full cursor-pointer text-blue-700 m-6 dark:text-black underline" htmlFor="imageInput">{thumbnail == null ? 'Choose image' : thumbnail.name.slice(0, 20) + '...'}</label>
                <input onChange={imageHandler} className='hidden' aria-describedby="user_avatar_help" id="imageInput" type="file" accept="image/jpg, image/jpeg, image/png" />
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="imageInput">Supports .png .jgg .jpeg file format</div>
            </div>
        </div>
    )
}

export default LeftFormWrapper