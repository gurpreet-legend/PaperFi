import { ethers } from 'ethers'
import React, { Children, useEffect } from 'react'
import PaperfiFactory from '../artifacts/contracts/Paperfi.sol/PaperfiFactory.json'

import { createContext, useState } from 'react'
import Constants from '../utils/Constants'

export const ServicesContext = createContext()

const ServicesContextProvider = ({ children }) => {

  const [contract, setContract] = useState({
    PaperFi: null
  })

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

    const contractRef = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      PaperfiFactory.abi,
      signer
    )
    setContract({ PaperFi: contractRef })
  }, [])

  const Services = {
    publishPaper: async (_title, _author, _requiredAmount, _imageURI, _pdfURI, _category, _desc) => {
      try {
        // const provider = new ethers.providers.Web3Provider(window.ethereum)
        // const signer = provider.getSigner()
        // const contractWithSigner = contract.PaperFi.connect(signer)
        // console.log(signer)
        const publishedPaper = await contract.PaperFi.publishPaper(
          _title,
          _author,
          _requiredAmount,
          _imageURI,
          _pdfURI,
          _category,
          desc, {
          gasLimit: Constants.GASLIMIT
        }
        )

        await publishedPaper.wait()
        // console.log(publishedPaper.to)
        return publishedPaper.to
      } catch (err) {
        console.log("Error in publishing the paper", err)
      }
    }
  }

  return (
    <ServicesContext.Provider
      value={{
        Services
      }}
    >
      {children}
    </ServicesContext.Provider>
  )
}

export default ServicesContextProvider