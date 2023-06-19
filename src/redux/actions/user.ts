import { createAction } from '@reduxjs/toolkit'

const setStep = createAction('user/changeStep')
const setFileList = createAction('user/setFileList')

export { setStep, setFileList }
