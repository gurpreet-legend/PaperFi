import React, { useState } from 'react'
import LeftFormWrapper from './LeftFormWrapper'
import RightFormWrapper from './RightFormWrapper'
import PublishedModal from '../Modals/PublishedModal'

const Form = () => {

    return (
        <form className='grid grid-cols-2'>
            <LeftFormWrapper />
            <RightFormWrapper
            //  setOpenModal={setOpenModal} setAddress={setAddress} 
            />
        </form>
    )
}

export default Form