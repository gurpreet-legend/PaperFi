import React from 'react'
import LeftPaperDetail from './LeftPaperDetail'
import RightPaperDetail from './RightPaperDetail'

const PaperDetail = () => {
    return (
        <div className='grid grid-cols-2 gap-8 p-4'>
            <LeftPaperDetail />
            <RightPaperDetail />
        </div>
    )
}

export default PaperDetail