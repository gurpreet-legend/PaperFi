import React from 'react'
import { createContext, useState } from 'react'

export const SearchFilterContext = createContext()

const SearchFilterProvider = ({ children }) => {

    const [searchText, setSearchText] = useState("")

    const updateSearchText = (newText) => {
        setSearchText(newText)
    }
    return (
        <SearchFilterContext.Provider
            value={{
                searchText,
                updateSearchText
            }}
        >
            {children}
        </SearchFilterContext.Provider>
    )
}

export default SearchFilterProvider