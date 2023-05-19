import { createContext, useContext, useState } from "react";

const TestModeContext=createContext();


export const TestModeContextProvider=({children})=>{

    const [timer ,setTimer]=useState(15);

    return <TestModeContext.Provider value={{timer ,setTimer}}>
        {children}
    </TestModeContext.Provider>
}

export const useTestMode = ()=> useContext(TestModeContext);