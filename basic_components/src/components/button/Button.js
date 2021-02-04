import React from 'react'
import './Button.css'

function Button({variant,color,clickHandler,name, ...rest}) {
   // console.log(disabled)
   // let className = (disabled) ? `button ${variant} ${color} disabled`:  `button ${variant} ${color}`
    return (
        
        <button className={`button ${variant} ${color} `} onClick={(e)=>clickHandler(e)}  >
           {name}
       </button>
    )
}

export default Button
