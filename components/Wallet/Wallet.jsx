import React, { useState } from 'react'
import { ethers } from 'ethers';

// const networks = {
//     ganache: {
//         chainId: `0x${Number(1337).toString(16)}`,
//         chainName: "Ganache Chain",
//         // nativeCurrency: {
//         //     name: "ETH",
//         //     symbol: "ETH",
//         // },
//         rpcUrls: ["http://127.0.0.1:7545"],
//         blockExplorerUrls: [""],
//     }
// }
const Wallet = () => {

    const [address, setAddress] = useState('')
    const [balance, setBalance] = useState('')
    const connectWallet = async () => {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        // const { name } = await provider.getNetwork()
        // if (name !== 'ganache') {
        //     await window.ethereum.request({
        //         method: "wallet_addEthereumChain",
        //         params: [
        //             {
        //                 ...networks["ganache"]
        //             }
        //         ]
        //     })
        // }
        const signer = provider.getSigner()
        const currAddress = await signer.getAddress()
        setAddress(currAddress)
        let currBalance = ethers.utils.formatEther(await provider.getBalance(currAddress));
        setBalance(currBalance);
        console.log(balance)
    }
    return (
        <button onClick={connectWallet} type="button" className="flex text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">
            <img src="/metamask.svg" className='h-5 w-5 mr-3' />
            <span>{address ? `${address.slice(0, 5)}` + `...` + `${address.slice(-4, -1)}` + ` | ${balance.slice(0, 5)} ETH` : `Connect`}</span>
        </button>
    )
}

export default Wallet