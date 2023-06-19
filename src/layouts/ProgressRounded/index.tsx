import Rounded from "../../components/Rounded";
import React from "react";
import {useSelector} from "react-redux";
import {UserState} from "../../interfaces/types";
import {MdDone} from "react-icons/md";
import config from "../../config";

export default function ProgressRounded(){
    const user : UserState = useSelector((state : any) => state.user)
    const totalStep : number = config.totalStep;

    return (
        <>
            <div className="relative w-[60%] h-[20%] bg-[transparent] flex items-center justify-evenly text-[#e2e8f0] select-none">
            <div className="absolute z-10 flex justify-between w-[100%]">
                {
                    Array(totalStep).fill(0).map((_, index : number) => (
                        <Rounded key={index} className={index === user.step-1 ? 'bg-[#36b4ee] text-white border border-[1px] border-[#1a3250]' : ''}>
                            {
                                index < user.step-1 ? (
                                    <MdDone/>
                                ):(
                                    <>{index + 1}</>
                                )
                            }
                        </Rounded>
                    ))
                }
                </div>
                <div className="absolute z-0 top-[50%] w-[100%] h-[2px] bg-[#1b3c58]"></div>
            </div>
          </>
    )
}
