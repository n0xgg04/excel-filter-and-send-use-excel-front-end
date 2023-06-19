import React from 'react';
import Logo from "../../components/Logo";
import Page from '../../components/backgroundHue'
import NavigationBar from "../../components/NavigationBar";
import ProgressRounded from '../../layouts/ProgressRounded'
import { StyledEngineProvider } from '@mui/material/styles';
import {BsFillCloudDownloadFill} from "react-icons/bs";
import EnhancedTable from '../../components/Table'
import {useSelector} from "react-redux";
import axios from "axios";

export default function ManagePage() : JSX.Element{
    const user = useSelector((state : any) => state.user)
    const step = user.step

    React.useEffect(() => {

    },[])

    return (
        <>
            <StyledEngineProvider injectFirst>
                <Logo/>
                <Page className="grid place-items-center overflow-none">
                    <NavigationBar>
                        <ProgressRounded/>
                    </NavigationBar>
                    <div className="w-[90%] grid place-items-center pt-[5%]">
                        {step === 2 ? (
                         <>
                              <div className="w-[80%] h-[70vh] flex flex-row justify-center items-center gap-2 c-glass rounded-lg">
                                    <div className="w-[50%] h-[100%] flex flex-col items-start justify-start gap-2">
                                        <span className="text-white text-[0.8rem] pt-2">Tuỳ chỉnh</span>
                                    </div>
                              </div>
                         </>
                        ) : <EnhancedTable/>}
                    </div>
                    <div className="absolute top-5 right-5">
                        <button className="bg-[#36b4ee] rounded-lg px-3 py-2 text-[#1E1E1E] text-[0.8rem] flex flex-row items-center justify-center gap-2"><BsFillCloudDownloadFill/><span>Tải xuống</span></button>
                    </div>
                </Page>
            </StyledEngineProvider>
        </>
    )

}
