import React, { useState } from 'react'
import { createContext } from 'react'

export const FormContext = createContext()

const FormContextProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        purchaseAmount: "",
        description: "",
        requiredAmount: "",
        category: "",
        thumbnail: null,
        pdfFile: null,
        assetFile: null,
    })

    const imageHandler = (e) => {
        setFormData({
            ...formData,
            thumbnail: e.target.files[0]
        })
    }

    const paperHandler = (e) => {
        setFormData({
            ...formData,
            pdfFile: e.target.files[0]
        })
    }

    const assetHandler = (e) => {
        setFormData({
            ...formData,
            assetFile: e.target.files[0]
        })
    }

    const inputHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

        console.log({ ...formData })
    }

    const updateFormData = (data) => {
        setFormData({
            ...formData, ...data
        })
    }
    return (
        <FormContext.Provider
            value={{
                ...formData,
                updateFormData,
                paperHandler,
                assetHandler,
                imageHandler,
                inputHandler
            }}
        >
            {children}
        </FormContext.Provider>
    )
}

export default FormContextProvider