import { ethers } from 'ethers'
import React, { useEffect } from 'react'
import PaperfiFactory from '../artifacts/contracts/Paperfi.sol/PaperfiFactory.json'

import { createContext, useState } from 'react'
import Constants from '../utils/Constants'

export const ServicesContext = createContext()

const ServicesContextProvider = ({ children }) => {

  const [contract, setContract] = useState({
    PaperFi: null
  })

  const updateContract = (contractRef) => {
    setContract({ PaperFi: contractRef })
  }

  useEffect(() => {
    //get Contracts
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const signer = provider.getSigner()
    const contractRef = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      PaperfiFactory.abi,
      signer
    )
    updateContract(contractRef)
    console.log(contractRef)
  }, [])

  const Services = {
    publishPaper: async (_title, _author, _requiredAmount, _imageURI, _pdfURI, _category, _desc) => {
      try {
        const publishedPaper = await contract.PaperFi.publishPaper(
          _title,
          _author,
          _requiredAmount,
          _imageURI,
          _pdfURI,
          _category,
          desc
        )

        await publishedPaper.wait()
        return publishedPaper.to
      } catch (err) {
        console.log("Error in publishing the paper", err)
      }
    },

    getAllPublishedPapers: async () => {
      try {
        // console.log(contract.PaperFi)
        if (contract.PaperFi !== null) {
          const publishedPapers = await contract.PaperFi.filters.paperPublished()
          let events = await contract.PaperFi.queryFilter(publishedPapers)
          let orderedEvents = events.reverse()
          // console.log(orderedEvents)
          let AllPublishedPapers = orderedEvents.map((e) => {
            return {
              title: e.args.title,
              author: e.args.author,
              requiredAmount: parseInt(e.args.requiredAmount),
              owner: e.args.owner,
              paperAddress: e.args.paperAddress,
              imageURI: e.args.imageURI,
              pdfURI: e.args.pdfURI,
              timestamp: parseInt(e.args.timestamp),
              category: e.args.category
            }
          })
          console.log(orderedEvents)
          return AllPublishedPapers
        }
      }
      catch (err) {
        console.log("Error fetching published papers", err)
      }
    },

    getFilteredPublishedPapers: async (filterCategory) => {
      try {
        // console.log(contract.PaperFi)
        if (contract.PaperFi !== null) {
          const publishedPapers = await contract.PaperFi.filters.paperPublished(null, null, null, null, null, null, null, null, filterCategory)
          let events = await contract.PaperFi.queryFilter(publishedPapers)
          let orderedEvents = events.reverse()
          // console.log(orderedEvents)
          let filteredPublishedPapers = orderedEvents.map((e) => {
            return {
              title: e.args.title,
              author: e.args.author,
              requiredAmount: parseInt(e.args.requiredAmount),
              owner: e.args.owner,
              paperAddress: e.args.paperAddress,
              imageURI: e.args.imageURI,
              pdfURI: e.args.pdfURI,
              timestamp: parseInt(e.args.timestamp),
              category: e.args.category
            }
          })
          console.log(filteredPublishedPapers)
          return filteredPublishedPapers
        }
      }
      catch (err) {
        console.log("Error fetching published papers", err)
      }
    },
  }

  return (
    <ServicesContext.Provider
      value={{
        contract,
        updateContract,
        Services
      }}
    >
      {children}
    </ServicesContext.Provider>
  )
}

export default ServicesContextProvider