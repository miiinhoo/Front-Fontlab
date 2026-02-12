import { type JSX } from "react";
import { Link } from "react-router-dom";
import Logo from '../imgs/FontLabLogo.png';
import { NavLogout,NavLogin } from "../arrays/NavArrays";
import { auth } from "../firebase/firebase";
import useCustomhook from "../hooks/useCustomhook";

export default function BasicHeader():JSX.Element{

    // 로그인 판별
    const isLoggedIn = !auth.currentUser ? NavLogout : NavLogin;

    // 로그아웃기능,useLocation,상태값 가져오기
    const { handleLogout,loc,bool,setBool } = useCustomhook();

    return(
        <div className="header-inner">
                <h1>
                    <Link to = "/explore">
                        <img src={Logo}/>
                    </Link>
                </h1>
                <nav>
                    <ul className="gnb">
                        {isLoggedIn.map((title:any) => {
                            const navActive = 
                            loc.pathname === title.path || 
                            (title.path === "/playground" &&
                            loc.pathname.startsWith("/playground")) ||
                            (title.path === "/user" &&
                            (loc.pathname === "/user/edit" ||
                            loc.pathname === "/user/favorite"));
                            if(title.text === "MYPAGE"){
                                return(
                                    <li key={title.text}>
                                        <button
                                        className={`menu-text ${bool ? "on" : ""}`}
                                        onClick={() => setBool(prev => !prev)}>
                                            MYPAGE
                                        </button>
                                        
                                    </li>
                                )
                            }
                            if(title.text === "LOGOUT"){
                                return(
                                    <li key={title.text}>
                                        <button
                                        className="menu-text"
                                        onClick={handleLogout}>
                                            LOGOUT
                                        </button>
                                    </li>
                                )
                            };
                            return(
                                <li key={title.text}>
                                    <Link 
                                    to={title.path}
                                    onClick={() => setBool(false)}
                                    className={`menu-text ${navActive ? "on" : ""}`}
                                    >
                                        {title.text}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
        </div>
    )
}