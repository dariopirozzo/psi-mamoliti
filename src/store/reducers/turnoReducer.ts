import { createSlice } from "@reduxjs/toolkit";

export interface turnoInfo {
    profesionalName: string;
    typeOfTherapy: string;
    turn: string;
}

export interface turnoInfoSlice {
    data: turnoInfo;
    error: any
}

const initialState: turnoInfoSlice = {
    data:{
        profesionalName:'',
        typeOfTherapy:'',
        turn:''
    },
    error: null 
}


const turnoInfoSlice = createSlice({
    name: 'turnoInfo',
    initialState,
    reducers:{
        getTurnoInfo:(state,action) => {
            state.data = action.payload
        },
        getTurnoInfoFailure: (state, action)=>{
            state.error = action.payload
        }
    }
})

export const { 
    getTurnoInfo,
    getTurnoInfoFailure
} = turnoInfoSlice.actions;

export default turnoInfoSlice.reducer