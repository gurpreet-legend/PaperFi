import CardList from "../components/CardList/CardList";
import { ServicesContext } from "../contexts/Services";
import { useContext, useEffect, useState } from "react";
import { ethers } from 'ethers';
import PaperfiFactory from '../artifacts/contracts/Paperfi.sol/PaperfiFactory.json'

export default function Home() {

  // const { Services, contract, updateContract } = useContext(ServicesContext)

  // useEffect(() => {
  // if (contract.PaperFi !== null)
  //   Services.getAllPublishedPapers()
  // }, [])

  return (
    <div className="container m-auto w-full p-6">
      <CardList />
    </div>
  )
}
