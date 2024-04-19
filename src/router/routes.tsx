import { Route,Routes } from "react-router-dom";
import Sesiones from "../pages/sesiones/Sesiones";
import Home from "../pages/Home/Home";
import Error from "../pages/error/error";

export const AppRouter = ()=>{
    return(
        <>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/sesiones" element={<Sesiones/>}></Route>

                <Route path="/*" element={<Error/>}></Route>
            </Routes>
        </>
    )
}