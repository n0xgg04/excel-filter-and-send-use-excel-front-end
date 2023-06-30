import React, {useState, useTransition} from 'react';
import Logo from "../../components/Logo";
import Page from '../../components/backgroundHue'
import NavigationBar from "../../components/NavigationBar";
import ProgressRounded from '../../layouts/ProgressRounded'
import { StyledEngineProvider } from '@mui/material/styles';
import {AiOutlineArrowRight} from "react-icons/ai";
import DataTable from 'react-data-table-component';
import {BiRightArrow} from "react-icons/bi";
import {useSelector} from "react-redux";
import axios from "axios";
import { Checkbox } from 'primereact/checkbox';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';// core css
import { UserState } from '../../interfaces/types';
import config from "../../config";
import {useNavigate} from "react-router-dom";
import Helmet from "react-helmet";

type getDataOpts = 'Col' | 'CleanData';
interface axiosGetInterface {
    fileList: string[],
    get: getDataOpts
}

function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


export default React.memo(function ManagePage() : JSX.Element{
    const user : UserState = useSelector((state : any) => state.user)
    // eslint-disable-next-line
    const step = user.step;
    const [ingredients, setIngredients] = useState<any>([]);
    // eslint-disable-next-line
    const [isPending, startTransition] = useTransition();
    const [data, setData] = useState<any>([]);
    const navigate = useNavigate();
    const [colList, setColList] = useState<Set<string>>(new Set());
    const _id = React.useId();
    const originColData = React.useRef<any>([]);
    const [colData, setColData] = useState<any>([]);

    function getUniqueArrayByKeys<T extends Record<string, any>>(arr: T[], keys: (keyof T)[]): T[] {
        const uniqueMap = new Map<string, T>();

        arr.forEach(obj => {
            const keyValues = keys.map(key => obj[key]);
            const uniqueKey = keyValues.join('|');

            if (!uniqueMap.has(uniqueKey)) {
                uniqueMap.set(uniqueKey, obj);
            }
        });

        return Array.from(uniqueMap.values());
    }




    const filter = (filterBy: string[]) => {
        if(filterBy.length === 0) return setColData(originColData.current);
       // console.log("filtering", filterBy, originColData.current);
        setColData(getUniqueArrayByKeys(originColData.current, filterBy));
    }

    const onIngredientsChange = (e:any) => {
        let _ingredients : any = [...ingredients];

        if (e.checked)
            _ingredients.push(e.value);
        else
            _ingredients.splice(_ingredients.indexOf(e.value), 1);

        filter(_ingredients);
        setIngredients(_ingredients);
    }

    React.useEffect(() => {
        //!Get data
        if(user.fileList.data.length === 0) navigate('/');
        let fileList = user.fileList.data;
        const data: axiosGetInterface = {
            fileList: fileList,
            get: 'Col',
        }

        startTransition(() => {
            if (data.fileList.length > 0)
                axios.post(config.url + '/extractData', data)
                    .then((res) => {
                        const response = res.data;
                        setData(response.data);
                    }).then((res) => {
                    console.log(res);
                })
                    .catch((err) => {
                        console.log(err);
                    });
        });
        // eslint-disable-next-line
    },[]);

    React.useEffect(() => {
        if(data.length === 0) return ;
        let listFiles: string[] = Object.keys(data);
        const rawData: any[] = [];
        const column = listFiles.map((filename, index) => {
            const result: Set<string>= new Set();
            data[filename].forEach((item:any) => {
                let _col = Object.keys(item);
                _col.forEach((col: string) => {
                    result.add(col);
                });
                rawData.push({
                    ...item,
                })
            });
            makeData(rawData);
            return result;
        })
        let _colList = new Set<string>();
        column.forEach((item) => {
            item.forEach((col) => {
                _colList.add(col);
            })
        })
        setColList(_colList);
        // eslint-disable-next-line
    },[data]);

    const makeColData =() => {
        let result: any = [];
        colList.forEach((item) => {
            result.push({
                name: item,
                selector: (row: any) => row[item],
                sortable: true,
            })
        })
        return result;
    };

    const makeData = (data: any) => {
        let result: any = [];
        data.forEach((item:any) => {
            let _item: any = {};
            let isValid = false;
            colList.forEach((col) => {
                if(String(item[col])?.indexOf('@') > 0 && isValidEmail(item[col])) isValid = true;
                _item[col] = item[col] || '';
            })
            isValid && result.push(_item);
        });
        originColData.current = result;
        setColData(result);
    }

    return (
        <>
            <Helmet>
                <title>Tuỳ chỉnh</title>
            </Helmet>
            <StyledEngineProvider injectFirst>
                <Logo/>
                <Page className="grid place-items-center overflow-none anim-in">
                    <NavigationBar>
                        <ProgressRounded/>
                    </NavigationBar>
                    <div className="w-[90%] grid place-items-center pt-[5%]">
                         <>
                              <div className="w-[80%] min-h-[70vh] flex flex-row justify-center gap-2 c-glass rounded-lg">
                                    <div className="w-[80%] h-[100%] flex flex-col justify-start items-center gap-2 text-white text-[17px]">
                                        <span className="text-[1rem] pt-2 bg-[#36b5ee] px-5 by-3 rounded-bl-lg rounded-br-lg align-center text-black">Tuỳ chỉnh</span>
                                        <div className="w-full flex flex-row gap-5 justify-evenly pt-5 select-none">
                                             <label className="text-[#35b6ee] flex flex-row items-center gap-1"><BiRightArrow/> Loại bỏ cái hàng trùng nhau nếu có trùng : </label>
                                            <div className="flex flex-wrap justify-content-center gap-3">
                                                {   colList.size > 0 && Array.from(colList).map((item, index) =>
                                                <div className="flex align-items-center" key={index + _id}>
                                                    <Checkbox inputId={`ingredient${index}`} name={item} value={item} onChange={onIngredientsChange} checked={ingredients.includes(item)} />
                                                    <label htmlFor={`ingredient${index}`} className="ml-2">{item}</label>
                                                </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-row gap-5 justify-evenly pt-5 select-none">
                                            <label className="text-[#35b6ee] flex flex-row items-center"><BiRightArrow/> Giá trị còn lại :  </label>
                                            <div className="flex-grow">
                                                <span className="bg-[#35b6ee] rounded-full px-5 py-1">{colData.length}</span>
                                            </div>
                                        </div>
                                        <div className="rounded-lg overflow-hidden w-full flex flex-row gap-5 justify-evenly pt-5 select-none">
                                            <DataTable
                                                columns={makeColData()}
                                                data={colData}
                                                selectableRows
                                            />
                                        </div>
                                    </div>
                              </div>
                         </>
                    </div>
                    <div className="absolute top-5 right-5">
                        <button
                            onClick={() => {
                                navigate('/mail',{
                                    state: {
                                        columnList: Array.from(colList),
                                        data: colData,
                                    }
                                });
                            }}
                            className="bg-[#36b4ee] rounded-lg px-3 py-2 text-[#1E1E1E] text-[0.8rem] flex flex-row items-center justify-center gap-2 hover:bg-[#25b7ee] hover:scale-105 ease-in-out duration-300"
                        >
                            <AiOutlineArrowRight/>
                            <span>Soạn mail</span>
                        </button>
                    </div>
                </Page>
            </StyledEngineProvider>
        </>
    )
});
