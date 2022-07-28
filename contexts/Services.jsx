import { ethers } from 'ethers'
import React, { useEffect } from 'react'
import PaperfiFactory from '../artifacts/contracts/Paperfi.sol/PaperfiFactory.json'
import PaperfiContract from '../artifacts/contracts/Paperfi.sol/Paperfi.json'
import { toast } from 'react-toastify'
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
        console.log({ _requiredAmount })

        const parsedAmount = ethers.utils.parseEther(_requiredAmount.toString())
        const publishedPaper = await contract.PaperFi.publishPaper(
          _title,
          _author,
          parsedAmount,
          _imageURI,
          _pdfURI,
          _category,
          desc
        )

        // contract.PaperFi.on("paperPublished", () => {
        //   console.log("PAPER HAS BEEN PUBLISHED !!!!")
        // })

        await publishedPaper.wait()
        return publishedPaper.to
      } catch (err) {
        console.log("Error in publishing the paper", err)
      }
    },

    getAllPublishedPapers: async () => {
      try {
        if (contract.PaperFi !== null) {
          const publishedPapers = contract.PaperFi.filters.paperPublished()
          // console.log({ publishedPapers })
          let events = await contract.PaperFi.queryFilter(publishedPapers)
          // console.log({ events })
          console.log("CONTRACT ADDRESS", contract.PaperFi.address)
          let orderedEvents = events.reverse()
          // console.log(orderedEvents)
          let AllPublishedPapers = orderedEvents.map((e) => {
            return {
              title: e.args.title,
              author: e.args.author,
              requiredAmount: ethers.utils.formatEther((e.args.requiredAmount).toString()),
              owner: e.args.owner,
              paperAddress: e.args.paperAddress,
              imageURI: e.args.imageURI,
              pdfURI: e.args.pdfURI,
              timestamp: parseInt(e.args.timestamp),
              category: e.args.category,
              categoryName: e.args.categoryName,
            }
          })
          console.log(AllPublishedPapers)
          return AllPublishedPapers
        }
      }
      catch (err) {
        console.log("Error fetching published papers", err)
      }
    },

    getFilteredPublishedPapers: async (filterCategory) => {
      try {
        if (contract.PaperFi !== null) {
          const publishedPapers = await contract.PaperFi.filters.paperPublished(null, null, null, null, null, null, null, null, filterCategory, null)
          // console.log({ "filteredpublishedPapers": publishedPapers })
          let events = await contract.PaperFi.queryFilter(publishedPapers)
          // console.log({ "filteredEvents": events })
          let orderedEvents = events.reverse()
          // console.log(orderedEvents)
          let filteredPublishedPapers = orderedEvents.map((e) => {
            return {
              title: e.args.title,
              author: e.args.author,
              requiredAmount: ethers.utils.formatEther((e.args.requiredAmount).toString()),
              owner: e.args.owner,
              paperAddress: e.args.paperAddress,
              imageURI: e.args.imageURI,
              pdfURI: e.args.pdfURI,
              timestamp: parseInt(e.args.timestamp),
              category: e.args.category,
              categoryName: e.args.categoryName,
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

    getPaperData: async (paperAddress) => {
      try {
        const provider = new ethers.providers.JsonRpcProvider(
          process.env.NEXT_PUBLIC_RPC_URL
        )
        console.log({ provider })
        console.log({ PaperfiContract })
        const paperContract = new ethers.Contract(
          paperAddress,
          PaperfiContract.abi,
          provider
        )

        // console.log({ paperContract })
        const title = await paperContract.title()
        const author = await paperContract.author()
        const requiredAmount = await paperContract.requiredAmount()
        const image = await paperContract.image()
        const pdf = await paperContract.pdf()
        const description = await paperContract.description()
        const owner = await paperContract.owner()
        const recievedAmount = await paperContract.recievedAmount()

        const paperData = {
          paperAddress,
          title,
          author,
          requiredAmount: ethers.utils.formatEther(requiredAmount.toString()),
          image,
          pdf,
          description,
          owner,
          recievedAmount: ethers.utils.formatEther(recievedAmount.toString())
        }
        // console.log({ paperData })
        return paperData
      }
      catch (err) {
        console.log("Error while fetching paper details", err)
      }
    },

    getDonations: async (paperAddress) => {
      try {
        const provider = new ethers.providers.JsonRpcProvider(
          process.env.NEXT_PUBLIC_RPC_URL
        )
        const paperContract = new ethers.Contract(
          paperAddress,
          PaperfiContract.abi,
          provider
        )

        const Donations = await paperContract.filters.donated()
        const AllDonations = await paperContract.queryFilter(Donations)

        const DonationData = AllDonations.map((e) => {
          return {
            donar: e.args.donar,
            amount: ethers.utils.formatEther((e.args.amount).toString()),
            timestamp: parseInt(e.args.timestamp)
          }
        })
        console.log({ DonationData })
        return DonationData
      }
      catch (err) {
        console.log("Error while fetching donations", err)
      }
    },

    donateFunds: async (paperAddress, amount) => {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(paperAddress, PaperfiContract.abi, signer);

        const transaction = await contract.donate({ value: ethers.utils.parseEther(amount) });
        await transaction.wait();
        toast("Funds transfered successfully")

      } catch (err) {
        console.log("Error while sending donation", err);
        toast.error("Error while sending funds")
      }

    }
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