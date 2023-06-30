import { setStep, setFileList } from '../actions/user';
import { createReducer } from '@reduxjs/toolkit';
import { UserState } from '../../interfaces/types';

const initialState: UserState = {
    step: 1,
    fileList: {
        data: [],
    }
};


const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setStep, (state : any, action : any) => {
            state.step = action.payload;
        })
        .addCase(setFileList, (state : any, action : any) => {
            state.fileList = action.payload;
        })
});

export default userReducer;
