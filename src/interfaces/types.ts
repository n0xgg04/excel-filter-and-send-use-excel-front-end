

export interface UserState {
    step: number,
    fileList: {
        data: Array<string>,
        message?: string,
        status?: string
    }
}

export interface configInterface{
    totalStep : number,
    url : string
}
