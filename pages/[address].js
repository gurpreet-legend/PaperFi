import React, { useEffect, useContext, useState } from 'react'
import PaperDetail from '../components/PaperDetail/PaperDetail'
import { ethers } from 'ethers'
import PaperfiFactory from '../artifacts/contracts/Paperfi.sol/PaperfiFactory.json'
import { useRouter } from 'next/router'
import { ServicesContext } from '../contexts/Services'
import { TailSpin } from 'react-loader-spinner'

const detail = ({ query }) => {
    // console.log(props)
    // const router = useRouter()
    let param = query.address
    const { Services } = useContext(ServicesContext)
    const [paperData, setPaperData] = useState({})

    const [loading, setLoading] = useState(false)
    const [donations, setDonations] = useState([])
    // const [paperAddressParam, setPaperAddressParam] = useState("")


    const fetchPaperData = async () => {
        setLoading(true)

        //fetching paper data
        const dataRes = await Services.getPaperData(param)
        setPaperData({ ...dataRes })
        console.log({ dataRes })

        //fetching donations
        const donationsRes = await Services.getDonations(param)
        setDonations(donationsRes)

        setLoading(false)
    }

    useEffect(() => {
        fetchPaperData()
    }, [param])

    return (
        <div>
            {
                loading && !paperData.owner ?
                    <div className='h-[90vh] flex justify-center items-center'>
                        <TailSpin color='#3b82f6' />
                    </div>
                    : <div className='container m-auto'>
                        <PaperDetail
                            title={paperData.title}
                            author={paperData.author}
                            description={paperData.description}
                            image={paperData.image}
                            assets={paperData.assets}
                            purchaseAmount={paperData.purchaseAmount}
                            owner={paperData.owner}
                            paperAddress={paperData.paperAddress}
                            pdf={paperData.pdf}
                            recievedAmount={paperData.recievedAmount}
                            requiredAmount={paperData.requiredAmount}
                            donations={donations}
                        />
                    </div>
            }
        </div>

    )
}

// export async function getStaticPaths() {
//     const provider = new ethers.providers.JsonRpcProvider(
//         process.env.NEXT_PUBLIC_RPC_URL
//     );

//     const contract = new ethers.Contract(
//         process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
//         PaperfiFactory.abi,
//         provider
//     );

//     const getAllPublishedPapers = contract.filters.paperPublished();
//     const events = await contract.queryFilter(getAllPublishedPapers);

//     return {
//         paths: events.map((e) => ({
//             params: {
//                 address: e.args.paperAddress.toString(),
//             }
//         })),
//         fallback: "blocking"
//     }
// }

export const getServerSideProps = async (context) => {
    const { query } = context
    return { props: { query } };
}

export default detail