import React from 'react'
import '../../styles/style.scss'
import Page from '../../components/backgroundHue'
import Logo from '../../components/Logo'
import ProgressRounded from '../../layouts/ProgressRounded'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { RiFileExcel2Fill } from 'react-icons/ri'
import { AiFillFileAdd } from 'react-icons/ai'
import {GrNext} from 'react-icons/gr'
import {isAdvancedUpload} from '../../utils/browser'
import $ from 'jquery';
import {isEmpty} from 'lodash'
import {useSelector, useDispatch, batch} from "react-redux";
import {UserState} from "../../interfaces/types";
import {setStep} from '../../redux/actions/user'
import axios from 'axios';
import config from "../../config";
import {useNavigate} from "react-router-dom";
import Helmet from "react-helmet";

export default function HomePage(){
    const boxRef = React.useRef<HTMLDivElement>(null)
    const droppedFiles = React.useRef<any>(null)
    const [receivedFiles, setReceivedFiles] = React.useState<number>(0);
    const user : UserState = useSelector((state : any) => state.user)
    const [uploading, setUploading] = React.useState<boolean>(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    React.useEffect(() : void => {
        if(!isAdvancedUpload) return;
        if(boxRef.current === null) return;
        const $form = $(boxRef.current);
        $form.on('drag dragstart dragend dragover dragenter dragleave drop', function(e: any) {
            e.preventDefault();
            e.stopPropagation();
        })
            .on('dragover dragenter', function() {
                $form.addClass('is-dragover');
            })
            .on('dragleave dragend drop', function() {
                $form.removeClass('is-dragover');
            })
            .on('drop', function(e : any) {
                droppedFiles.current = e.originalEvent.dataTransfer.files || null;
                if(!isEmpty(droppedFiles.current)){
                    saveFiles(droppedFiles.current);
                }
            });
        // eslint-disable-next-line
    },[])

    const uploadFiles = React.useCallback(() : void => {
        if(isEmpty(droppedFiles.current)) return;
        const formData = new FormData();
        formData.append('files', droppedFiles.current[0]);
        setUploading(true);
        axios.post(config.url+'/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            return res.data;
        }).then((data) => {
            setUploading(false);
            dispatch({
                type: "user/setFileList",
                payload: data
            })
            navigate('/manage')
        })
            .catch((err) => {
            console.log(err);
        })
        // eslint-disable-next-line
    },[])

    const saveFiles = React.useCallback((data : any) : void => {
        batch(() => {
            dispatch({
                type: setStep.type,
                payload: user.step + 1
            });
            setReceivedFiles(data.length);
        })
        // eslint-disable-next-line
    },[])

    const selectedFile = (e : any) : void  => {
        droppedFiles.current = e.target.files || null;
        if(!isEmpty(droppedFiles.current)){
           saveFiles(droppedFiles.current)
        }
    }


    return (
        <>
            <Helmet>
                <title>Tải lên tệp Excel</title>
            </Helmet>
           <Logo/>
           <Page className="grid place-items-center overflow-none">
                <div className="w-[70%] h-[70%] bg-[transparent] c-glass rounded-lg flex flex-col items-center overflow-x-hidden">
                    <ProgressRounded/>
                    <div ref={boxRef} className="h-[70%] w-[80%] border border-dashed border-[2px] border-[#1b3c58] rounded-sm text-[#37bcf8] flex flex-col items-center justify-center gap-3">
                        <form className="h-full w-full flex flex-col items-center justify-center gap-2" method="post" action="" encType="multipart/form-data">
                            {!receivedFiles ? (
                            <>
                                <FaCloudUploadAlt className="w-[100px] h-[100px] text-[#37bcf8]"/>
                                { isAdvancedUpload && (
                                 <>
                                    <input onChange={selectedFile} type="file" className="hidden" data-multiple-caption="{count} files selected" multiple={true} id="fileInput"/>
                                    <p className="text-[1rem]">Kéo & thả tệp để tải lên</p>
                                    <span className="uppercase text-[0.7rem] ba-break">hoặc</span>
                                </>
                                )}
                                <label htmlFor="fileInput" className="bg-[#37bcf8] text-[#1b3c58] rounded-lg px-4 py-2 text-[0.8rem] cursor-pointer flex items-center gap-1">
                                    <AiFillFileAdd/>
                                    <span>Chọn tệp</span>
                                </label>
                            </>
                          ) : (
                            <div className="anim-in w-full h-full flex flex-col justify-center items-center gap-5">
                                <RiFileExcel2Fill className="w-[100px] h-[100px] text-[#37bcf8]"/>
                                <p className="text-[0.9rem]">{receivedFiles} tệp đã được chọn...</p>
                                <button onClick={uploadFiles} type="button" disabled={uploading} className={"bg-[#37bcf8] text-[#1b3c58] rounded-lg px-4 py-2 text-[0.8rem] cursor-pointer flex items-center gap-1"}>
                                    {
                                        !uploading ? (
                                            <span>Tải lên</span>
                                        ) : (
                                            <span>Đang tải lên...</span>
                                        )
                                    }
                                    <GrNext/>
                                </button>
                            </div>)}
                        </form>
                    </div>
                </div>
           </Page>
        </>
    )
}
