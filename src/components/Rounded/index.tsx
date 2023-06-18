import React from 'react';
export default function Rounded({children, className} : {
    children: React.ReactNode,
    className ?: string
}) {
    return (
        <>
            <div className={"rounded-full h-[40px] border border-[1.5px] border-[#1e293b] w-[40px] grid place-items-center text-[1em] text-[#36b4ee] bg-[#1b3c58] " + (!!className ? className : '')}>
                {children}
            </div>
        </>
    );
}
