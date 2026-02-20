import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import BasicHeader from "./BasicHeader";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import useCustomhook from "../hooks/useCustomhook";
import { AuthStore } from "../store/AuthStore";



export default function BasicLayout(){
    
    const {loc} = useCustomhook();
    const user = AuthStore(state => state.user);
    const [ loading, setLoading ] = useState<boolean>(true);

    
    useEffect(() => {
        // 유저 정보 저장
        const unsub = onAuthStateChanged(auth,(user) => {
            // 스토어에 유저정보 저장
            AuthStore.getState().setUser(user);
            setLoading(false);
        });
        return () => unsub();
    },[]);

    // 분리
    useEffect(() => {
        if(loc.pathname === "/user/login"){
            document.title = "FontLab | 로그인";
        } else if(loc.pathname === "/user/signup"){
            document.title = "FontLab | 회원가입";
        } else {
            document.title = "FontLab";
        }
    }, [loc.pathname]);

    if (loading) return <div>Loading</div>;




    return(
        <>
            
            <header>
                <BasicHeader user={user}/>
            </header>
            <main>
                <Outlet/>
            </main>
        </>
    )
}