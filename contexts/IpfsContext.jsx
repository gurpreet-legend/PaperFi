import React from 'react'
import { createContext, useState } from 'react'

export const IpfsContext = createContext()

const IpfsContextProvider = ({ children }) => {

    const [ipfsData, setIpfsData] = useState({
        thumbnailURL: "",
        pdfFileURL: "",
        assetFileURL: ""
    })

    const updateIpfsData = (data) => {
        setIpfsData({
            ...ipfsData,
            ...data
        })
    }

    return (
        <IpfsContext.Provider
            value={{
                ...ipfsData,
                updateIpfsData
            }}
        >
            {children}
        </IpfsContext.Provider>
    )
}

export default IpfsContextProvider