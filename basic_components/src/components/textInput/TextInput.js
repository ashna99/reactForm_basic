import React from 'react'
import './TextInput.css'

function TextInput({name,value,changeHandler,style,...rest}) {
    return (
        <>
        <label >{name}</label><br />        
         <input type="text" value={value} onChange={(e)=>changeHandler(e)}  className='default' style={style}></input>   
        </>
    )
}

export default TextInput
