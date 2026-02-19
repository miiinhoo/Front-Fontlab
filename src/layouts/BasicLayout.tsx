import { useEffect, useState, type JSX } from "react";
import { Outlet } from "react-router-dom";
import BasicHeader from "./BasicHeader";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import useCustomhook from "../hooks/useCustomhook";



export default function BasicLayout():JSX.Element{
    
    const { item: user,
        setItem: setUser,
        loc
    } = useCustomhook();

    const [ loading, setLoading ] = useState<boolean>(true);

    useEffect(() => {
        // 유저 정보 저장
        const unsub = onAuthStateChanged(auth,(user) => {
            setUser(user);
            setLoading(false);
        });
        // 사이트 탭
        if(loc.pathname === "/user/login"){
            document.title = "FontLab | 로그인";
        }else if(loc.pathname === "/user/signup"){
            document.title = "FontLab | 회원가입";
        }else{
            document.title = "FontLab";
        }
        return () => unsub();
    },[loc.pathname])

    if (loading) return <div>Loading</div>;




    return(
        <>
            
            <header>
                <BasicHeader user={user}/>
            </header>
            <main>
                <Outlet context={{ user }}/>
            </main>
        </>
    )
}