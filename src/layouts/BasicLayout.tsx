import type { JSX } from "react";
import { Outlet } from "react-router-dom";
import BasicHeader from "./BasicHeader";


export default function BasicLayout():JSX.Element{
    return(
        <>
            <header>
                <BasicHeader/>
            </header>
            <main>
                <Outlet/>
            </main>
        </>
    )
}