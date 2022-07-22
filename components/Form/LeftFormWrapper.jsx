import React from 'react'

const LeftFormWrapper = () => {
    return (
        <div>
            <div className='m-6  h-[40vh] p-6 pb-10 flex flex-col justify-center items-center rounded-3xl border-dashed border-4 border-blue-700 dark:border-blue-500'>
                <div className="mt-1 text-2xl text-blue-700 dark:text-blue-500 font-semibold" id="fileInput">Upload PDF</div>
                <label className="flex bg-blue-400 justify-center w-fit p-4 px-8 rounded-full cursor-pointer text-blue-700 m-6 dark:text-black underline" htmlFor="fileInput">Choose file</label>
                <input className='hidden' aria-describedby="user_avatar_help" id="fileInput" type="file" />
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="fileInput">Supports .pdf file format</div>
            </div>
            <div className='m-6  h-[40vh] p-6 pb-10 flex flex-col justify-center items-center rounded-3xl border-dashed border-4 border-blue-700 dark:border-blue-500'>
                <div className="mt-1 text-2xl text-blue-700 dark:text-blue-500 font-semibold" id="imageInput">Upload thumbnail</div>
                <label className="flex bg-blue-400 justify-center w-fit p-4 px-8 rounded-full cursor-pointer text-blue-700 m-6 dark:text-black underline" htmlFor="imageInput">Choose file</label>
                <input className='hidden' aria-describedby="user_avatar_help" id="imageInput" type="file" />
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="imageInput">Supports .png .jgg .jpeg file format</div>
            </div>
        </div>
    )
}

export default LeftFormWrapper