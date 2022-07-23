import React from 'react'
import LeftFormWrapper from './LeftFormWrapper'
import RightFormWrapper from './RightFormWrapper'

const Form = () => {
    return (
        <form className='grid grid-cols-2'>
            <LeftFormWrapper />
            <RightFormWrapper />
        </form>
    )
}

export default Form