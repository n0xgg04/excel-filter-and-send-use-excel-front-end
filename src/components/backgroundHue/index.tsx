import docs from "../../assets/images/docs@30.8b9a76a2.avif";
import docsDark from "../../assets/images/docs-dark@30.1a9f8cbf.avif";
import React from "react";

export default function Page({children, className}: {children: React.ReactNode, className ?: string}){
    return (
        <section className={"w-full h-full bg-[#10172a] homepage overflow-x-hidden " + className}>
            <div className="absolute w-full flex-none flex justify-end z-0 overflow-x-hidden">
                <picture>
                    <source srcSet={docs} type="image/avif" />
                    <img
                        src=""
                        alt=""
                        className="w-[71.75rem] flex-none max-w-none dark:hidden"
                        decoding="async"
                    />
                </picture>
                <picture>
                    <source srcSet={docsDark} type="image/avif" />
                    <img
                        src=""
                        alt=""
                        className="w-[90rem] flex-none max-w-none hidden dark:block"
                        decoding="async"
                    />
                </picture>
            </div>
            {children}
        </section>
    )
}
