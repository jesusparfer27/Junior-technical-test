import { createContext, useContext, useState } from "react";

const IterativeContextFooter = createContext()

export const useIterativeContext = () => useContext(IterativeContextFooter)

export const useFooterContext = ({ children }) => {
    const [furnitureByViewport, setFurnitureByViewport] = useState("")

    return (
        <IterativeContextFooter.Provider value={{ furnitureByViewport }}>
        {children}
        </IterativeContextFooter.Provider>
    )
}