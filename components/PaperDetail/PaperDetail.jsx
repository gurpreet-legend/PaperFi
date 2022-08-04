import React from 'react'
import LeftPaperDetail from './LeftPaperDetail'
import RightPaperDetail from './RightPaperDetail'

const PaperDetail = ({
    title,
    author,
    description,
    image,
    assets,
    owner,
    paperAddress,
    pdf,
    recievedAmount,
    requiredAmount,
    purchaseAmount,
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
                assets={assets}
                owner={owner}
                paperAddress={paperAddress}
                recievedAmount={recievedAmount}
                requiredAmount={requiredAmount}
                purchaseAmount={purchaseAmount}
                donations={donations}
            />
        </div>
    )
}

export default PaperDetail