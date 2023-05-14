import { createContext, useContext, useState } from "react";

const TestModeContext=createContext();


export const TestModeContextProvider=({children})=>{

    const [countDown,setCountDown]=useState(15);

    return <TestModeContext.Provider value={{countDown,setCountDown}}>
        {children}
    </TestModeContext.Provider>
}

export const useTestMode = ()=> useContext(TestModeContext);