import { useEffect, type JSX } from "react";
import { Outlet } from "react-router-dom";
import BasicHeader from "./BasicHeader";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";


export default function BasicLayout():JSX.Element{
    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        console.log("진짜 로그인 상태 =>", user);
    });

    return () => unsubscribe();
    }, []);

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