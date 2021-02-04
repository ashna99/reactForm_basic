import React from 'react'
import Option from '../option/Option'
import './Dropdown.css'
function Dropdown({values,name,style,changeHandler, ...rest}) {
       
    return (
        <>
        <label>{name}</label><br/>
            <select className={`dropdown`} style={style} onChange={(e) => changeHandler(e)} >
               
                {values.map((value)=>(<Option value={value} key={values.indexOf(value)} ></Option>))}
            </select>
        </>
    )
}

export default Dropdown
