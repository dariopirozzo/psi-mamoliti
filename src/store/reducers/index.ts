import { combineReducers } from "@reduxjs/toolkit";
import  turnoInfoSlice  from "./turnoReducer";

const rootReducer = combineReducers({
    turnoInfoSlice
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer