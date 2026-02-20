import "./User.scss";
import { useEffect } from "react";
import { UserArray } from "../../arrays/UserArrays";
import useCustomhook from "../../hooks/useCustomhook";
import ButtonComponent from "../../components/common/ButtonComponent";

export default function UserLogin(){

    const { navigate,userData, handleUserChange, handleLogin } = useCustomhook();
    
    // userData에 값이 들어왔을 때, 스타일이 조건부로 변경되도록 변경.
    const isValid = userData.email && userData.password;

    useEffect(() => {
    document.title = "FontLab | 로그인";
    }, []);

    return(
        <section>
                <form>
                    <div className="form-inner">
                    <h1 className="loginpage-title">로그인</h1>
                    {
                    UserArray.slice(1,3).map((x,inx) => (
                        <label key={inx}>
                            <input
                            name={x.name}
                            type={x.type || "text"}
                            placeholder={x.text}
                            value={userData[x.name as keyof typeof userData]}
                            onChange={handleUserChange}
                            />
                        </label>
                    ))
                    }

                        {/* 버튼 */}
                        <div className="button-content">
                            <ButtonComponent 
                            text="로그인"
                            event={handleLogin}
                            disable={!isValid}
                            cln={`login-btn ${isValid ? "active" : ""}`}
                            />
                            <ButtonComponent
                            text="회원가입"
                            event={() => navigate("/user/signup")}
                            />
                        </div>
                    </div>
                </form>
        </section>
    )
}