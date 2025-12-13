import type { JSX } from "react";
import { Link } from "react-router-dom";
import Logo from '../imgs/FontLabLogo.png';
import { NavLogout,NavLogin } from "../arrays/NavArrays";
import { auth } from "../firebase/firebase";
import useCustomhook from "../hooks/useCustomhook";

export default function BasicHeader():JSX.Element{

    // 로그인 판별
    const isLoggedIn = !auth.currentUser ? NavLogout : NavLogin;

    const { handleLogout } = useCustomhook();

    return(
        <div className="header-inner">
                <h1>
                    <Link to = "/">
                        <img src={Logo}/>
                    </Link>
                </h1>
                <nav>
                    <ul className="gnb">
                        {isLoggedIn.map((title:any) => (
                            <li>
                                <Link to={title.path || ""}
                                onClick={() => {
                                    if(title.text === "LOGOUT"){
                                        handleLogout();
                                    }
                                }}
                                >
                                    {title.text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
        </div>
    )
}