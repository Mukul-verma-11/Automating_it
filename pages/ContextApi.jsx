import React, { createContext,useState } from 'react'



export const RegistationNumberContext = createContext(null)


export const RegistationNumberProvider = (props) => {

    const [registraionNumber,setRegistraionNumber] = useState('#C3ACD0')


    return (
        <RegistationNumberContext.Provider value={{registraionNumber,setRegistraionNumber}} >
            {props.children}
        </RegistationNumberContext.Provider>
    )

}