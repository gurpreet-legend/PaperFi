import React from 'react'
import LeftFormWrapper from './LeftFormWrapper'
import RightFormWrapper from './RightFormWrapper'

const Form = () => {
    return (
        <div className='grid grid-cols-2'>
            <LeftFormWrapper />
            <RightFormWrapper />
        </div>
    )
}

export default Form