import React, { useState } from 'react'
import { createContext } from 'react'

export const FormContext = createContext()

const FormContextProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        description: "",
        requiredAmount: "",
        category: "",
        thumbnail: null,
        pdfFile: null
    })

    const imageHandler = (e) => {
        setFormData({
            ...formData,
            thumbnail: e.target.files[0]
        })
    }

    const fileHandler = (e) => {
        setFormData({
            ...formData,
            pdfFile: e.target.files[0]
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
                fileHandler,
                imageHandler,
                inputHandler
            }}
        >
            {children}
        </FormContext.Provider>
    )
}

export default FormContextProvider