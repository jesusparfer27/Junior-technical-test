import { createContext, useContext, useState } from "react";

const IterativeContextHeader = createContext()

export const useIterativeContext = () => useContext(IterativeContextHeader)

export const useFooterContext = ({ children }) => {
    const [furnitureByViewport, setFurnitureByViewport] = useState("")

    return (
        <IterativeContextHeader.Provider value={{ furnitureByViewport }}>
        {children}
        </IterativeContextHeader.Provider>
    )
}