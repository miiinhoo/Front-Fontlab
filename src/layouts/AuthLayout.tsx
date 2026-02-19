import type { JSX } from "react";
import { Link, Outlet } from "react-router-dom";
import MainLogo from "../imgs/FontLabLogo.png";

export default function AuthLayout():JSX.Element{

    return(
        <div className="auth-layout">
            <div className="auth-container">
                <div className="auth-header">
                    <Link to="/explore">
                        <img src={MainLogo} alt="페이지 메인로고"
                        className="auth-mainlogo"/>
                    </Link>
                </div>
                <div className="auth-content">
                    <Outlet/>
                </div>
                <div className="auth-footer">
                    <h3>
                        <img src={MainLogo} alt="페이지 서브로고" 
                        className="auth-sublogo"/>
                    </h3>
                    <p>© 2026 FontLab</p>
                </div>
            </div>
        </div>
    )
}