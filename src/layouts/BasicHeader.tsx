import { useState, type JSX } from "react";
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
                                        <ul className={`userSet ${bool ? "open" : ""}`}>
                                            {title.option.map((list:any,inx:any) => {
                                                /** 서브메뉴(즐겨찾기) 열고/닫기 기능 */
                                                const [ openSubmenu,SetOpenSubmenu ] = useState<boolean>(false);
                                                <>
                                                {list.name === "즐겨찾기" ? 
                                                <li key={inx}>
                                                    <button
                                                    onClick={() => SetOpenSubmenu(open => !open)}
                                                    >
                                                        즐겨찾기
                                                    </button>
                                                    { openSubmenu && (
                                                        <div>
                                                            {/* explore페이지에서 추가된 즐겨찾기 폰트들 이름을 column형태로 나열 + 복사(폰트이름,ex: Arial sans-serif) + 즐겨찾기 삭제기능(체크박스를 각줄에 추가하고, 위에 체크박스 하나 추가해서 전체삭제 기능도) */}
                                                        </div>
                                                    )}
                                                </li>
                                                :
                                                <li key={inx}>
                                                    <button
                                                    >
                                                        회원정보수정
                                                    </button>
                                                </li>
                                                }
                                                </>
                                        })}
                                        </ul>
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