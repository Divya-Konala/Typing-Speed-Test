import { createContext, useState } from "react";
import { ThemeOptions } from "../utils/ThemeOptions";
import { useContext } from "react";

const ThemeContext=createContext();

export const ThemeContextProvider=({children})=>{

    const [theme,setTheme]=useState(JSON.parse(localStorage.getItem("theme"))||ThemeOptions[0].value);
    
    return <ThemeContext.Provider value={{theme,setTheme}}>
        {children}
    </ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext);