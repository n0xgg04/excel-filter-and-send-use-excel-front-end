import React from 'react';
import Logo from "../../components/Logo";
import Page from '../../components/backgroundHue'
import NavigationBar from "../../components/NavigationBar";
import ProgressRounded from '../../layouts/ProgressRounded'
import { StyledEngineProvider } from '@mui/material/styles';
import {BsFillSendFill} from "react-icons/bs";
import {useDispatch} from "react-redux";
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';// core css
import Helmet from "react-helmet";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import config from "../../config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AiFillHome} from "react-icons/ai";

export default React.memo(function Mail() : React.JSX.Element{
    const dispatch = useDispatch();
    const location = useLocation();
    const data = location.state?.data || [];
    const titleRef = React.useRef<any>(null);
    const contentRef = React.useRef<any>(null);
    const [sent, setSent] = React.useState<boolean>(false);
    const [sending, setSending] = React.useState<boolean>(false);
    const navigate = useNavigate();

    React.useEffect(() => {
        if(data.length === 0) navigate('/');
       dispatch({
           type: 'user/changeStep',
           payload: 3
       });
        // eslint-disable-next-line
    },[]);

    const sendMail = () => {
        const mailList = data.map((item : any) => {
                return item['Email'];
        });
        if(titleRef.current.value === '' || contentRef.current.value === ''){
            toast.error('Vui lòng nhập đầy đủ thông tin', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                style:{
                    fontSize: '15px'
                }
            });
            return;
        }
        setSending(true);
        axios.post(`${config.url}/sendMail`, {
            mailList,
            title: titleRef.current.value,
            content: contentRef.current.value
        }).then(res => {
            const data = res.data;
            if(data.status === true){
                toast.info('🦄 Đã gửi email thành công !!!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    style:{
                        fontSize: '15px'
                    }
                });
                setSent(true);
            }
        }).catch(err => {
            console.log(err);
            toast.error('Gửi mail thất bại', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                style:{
                    fontSize: '15px'
                }
            });
        })
    }

    return (
        <>
            <Helmet>
                <title>Soạn thư</title>
            </Helmet>
            <StyledEngineProvider injectFirst>
                <ToastContainer />
                <Logo/>
                <Page className="grid place-items-center overflow-none anim-in">
                    <NavigationBar>
                        <ProgressRounded/>
                    </NavigationBar>
                    <div className="w-[90%] grid place-items-center pt-[5%]">
                        <>
                            <div className="w-[80%] min-h-[70vh] flex flex-row justify-center gap-2 c-glass rounded-lg pb-4 relative">
                                <div className="w-[80%] h-[100%] flex flex-col justify-start items-center gap-2 text-white text-[17px]">
                                    <span className="text-[1rem] pt-2 bg-[#36b5ee] px-5 by-3 rounded-bl-lg rounded-br-lg align-center text-black">Soạn thư</span>
                                    <div className="w-full h-full flex flex-col gap-5 justify-evenly items-center pt-5 select-none">
                                        { (sending && !sent) &&
                                        <div className="absolute top-0 w-full h-full rounded-lg flex items-center justify-center">
                                            <div className="w-[50px] h-[50px] border-4 border-[#36b4ee] border-t-4 border-t-[#000] rounded-full animate-spin"/>
                                        </div>
                                        }
                                        <textarea ref={titleRef}
                                            className="w-[90%] rounded-lg bg-[rgba(27,60,88,0.3)] text-white text-[17px] p-5 vertical-center focus:outline-none"
                                            placeholder="Tiêu đề thư"
                                            disabled={sent}
                                        />
                                        <textarea ref={contentRef}
                                            className="w-[90%] h-[50vh] rounded-lg bg-[rgba(27,60,88,0.3)] text-white text-[17px] p-5 focus:outline-none"
                                            placeholder="Nội dung thư"
                                            disabled={sent}
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    </div>
                    <div className="absolute top-5 right-5">
                        { !sent ?
                            <button
                                onClick={sendMail}
                                className="bg-[#36b4ee] rounded-lg px-3 py-2 text-[#1E1E1E] text-[0.8rem] flex flex-row items-center justify-center gap-2 hover:bg-[#25b7ee] hover:scale-105 ease-in-out duration-300"
                            >
                                <BsFillSendFill/>
                                <span>Gửi mail</span>
                            </button>
                            :
                            <button
                                onClick={() => {
                                    navigate('/');
                                }}
                                className="bg-[#36b4ee] rounded-lg px-3 py-2 text-[#1E1E1E] text-[0.8rem] flex flex-row items-center justify-center gap-2 hover:bg-[#25b7ee] hover:scale-105 ease-in-out duration-300"
                            >
                                <AiFillHome/>
                                <span>Về trang chủ</span>
                            </button>
                        }
                    </div>
                </Page>
            </StyledEngineProvider>
        </>
    )
});
