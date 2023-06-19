export default function NavigationBar({children, className} : {
    children?: React.ReactNode,
    className?: string
}){
    return (
        <>
               <div className="w-full h-[10%] fixed top-0 z-0 blur-sm top-5"></div>
               <header className={"w-[70%] h-[10%] fixed z-1 flex flex-row justify-center top-5 " + className}>
                   {children}
               </header>
        </>
    )
}
