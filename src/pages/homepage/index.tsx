import React from 'react'
import '../../styles/style.scss'
import Page from '../../components/backgroundHue'
import Logo from '../../components/Logo'
import Rounded from '../../components/Rounded'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { RiFileExcel2Fill } from 'react-icons/ri'
import { AiFillFileAdd } from 'react-icons/ai'
import {GrNext} from 'react-icons/gr'
import {isAdvancedUpload} from '../../utils/browser'
import $ from 'jquery';
import {isEmpty} from 'lodash'

export default function HomePage(){
    const boxRef = React.useRef<HTMLDivElement>(null)
    const droppedFiles = React.useRef<any>(null)
    const [receivedFiles, setReceivedFiles] = React.useState<number>(0);

    React.useEffect(() => {
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
                    setReceivedFiles(droppedFiles.current.length);
                }
            });
    },[])

    const selectedFile = (e : any) => {
        droppedFiles.current = e.target.files || null;
        if(!isEmpty(droppedFiles.current)){
            setReceivedFiles(droppedFiles.current.length);
        }
    }

    return (
        <>
           <Logo/>
           <Page className="grid place-items-center overflow-none">
                <div className="w-[70%] h-[70%] bg-[transparent] c-glass rounded-lg flex flex-col items-center">
                    <div className="relative w-[60%] h-[20%] bg-[transparent] flex items-center justify-evenly text-[#e2e8f0] select-none">
                        <div className="absolute z-10 flex justify-between w-[100%]">
                            <Rounded>1</Rounded>
                            <Rounded>2</Rounded>
                            <Rounded>3</Rounded>
                        </div>
                        <div className="absolute z-0 top-[50%] w-[100%] h-[2px] bg-[#1b3c58]"></div>
                    </div>
                    <div ref={boxRef} className="h-[70%] w-[80%] border border-dashed border-[2px] border-[#1b3c58] rounded-sm text-[#37bcf8] flex flex-col items-center justify-center gap-3">
                        <form className="h-full w-full flex flex-col items-center justify-center gap-2" method="post" action="" encType="multipart/form-data">
                            {!receivedFiles ? (
                            <>
                                <FaCloudUploadAlt className="w-[100px] h-[100px] text-[#37bcf8]"/>
                                { isAdvancedUpload && (
                                 <>
                                    <input onChange={selectedFile} type="file" className="hidden" data-multiple-caption="{count} files selected" multiple={true} id="fileInput"/>
                                    <p className="text-[1rem]">Kéo & thả tệp để tải lên</p>
                                    <span className="uppercase text-[0.7rem]">hoặc</span>
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
                                <button type="button" className="bg-[#37bcf8] text-[#1b3c58] rounded-lg px-4 py-2 text-[0.8rem] cursor-pointer flex items-center gap-1">
                                    <span>Tiếp tục</span>
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
