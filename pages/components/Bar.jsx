import React, { useState } from 'react'

const Bar = ({height,dataKey,dataValue,sendDataToParent,reg}) => {

    const [bgcolor,setBgcolor] = useState('rgb(61, 23, 102)')

    const handleButtonClick = () => {
        sendDataToParent(`${dataKey} : ${dataValue}`);
      };
      
    console.log(reg,'reg',dataValue)

  return ( 
        <>
            <span style={{height:Number(height)*3,width:'8px',border:'2px solid black',backgroundColor:reg == dataKey ? 'orange' : bgcolor ,margin:'2px'}} 
            onMouseLeave={() => (
                setBgcolor('rgb(61, 23, 102)')
            )} 
            onClick = {handleButtonClick}
            onMouseMove={() => setBgcolor('orange') } >
                
            </span>
            
        </>
  )
}

export default Bar
