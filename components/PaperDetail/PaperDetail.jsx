import React from 'react'
import LeftPaperDetail from './LeftPaperDetail'
import RightPaperDetail from './RightPaperDetail'

const PaperDetail = ({
    title,
    author,
    description,
    image,
    owner,
    paperAddress,
    pdf,
    recievedAmount,
    requiredAmount,
    donations
}) => {
    return (
        <div className='grid grid-cols-2 gap-8 p-4'>
            <LeftPaperDetail pdf={pdf} />
            <RightPaperDetail
                title={title}
                author={author}
                description={description}
                image={image}
                owner={owner}
                paperAddress={paperAddress}
                recievedAmount={recievedAmount}
                requiredAmount={requiredAmount}
                donations={donations}
            />
        </div>
    )
}

export default PaperDetail