import React from 'react'
import logo from '../../assets/images/mely.png'
export default function Logo(){
    return (
        <div className="absolute top-0.5 left-1 z-10">
            <img style={{
                filter: 'invert(100%)',
            }} src={logo} alt="logo" className="h-[70px]"/>
        </div>
    )
}
