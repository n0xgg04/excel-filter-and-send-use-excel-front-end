import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "../pages/homepage";
import ManagePage from "../pages/managepage";
import Mail from "../pages/mail";
import React from "react";


export default function Router(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/manage" element={<ManagePage />}/>
                <Route path='/mail' element={<Mail/>}/>
                <Route path='*' element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    );
}
