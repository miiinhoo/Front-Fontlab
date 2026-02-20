import "./User.scss";
import { useState } from "react";
import { UserArray } from "../../arrays/UserArrays";
import useCustomhook from "../../hooks/useCustomhook";
import ButtonComponent from "../../components/common/ButtonComponent";

export default function UserSignup(){

    const { 
        bool:pwError,setBool:setPwError,
        userData, setUserData, handleSignup, handleUserChange
     } = useCustomhook();

     // 드롭다운 이메일 리스트 ..
    const domainList = [
    "naver.com",
    "daum.net",
    "gmail.com",
    "yahoo.com",
    "kakao.com",
    "nate.com",
    "icloud.com",
    "직접입력"
    ];
    const [pwFocus, setPwFocus] = useState<boolean>(false);
    

    return(
        <section>
            <div className="page-inner">
                <form>
                    <div className="form-inner">
                    <h1 className="loginpage-title">회원가입</h1>
                    {UserArray.map((form: any) => {

                        if (form.name === "email") {
                            return (
                            <label key={form.name}>
                                <div style={{ display: "flex", gap: "5px",width:"80%" }}>
                                <input
                                    type="text"
                                    placeholder="이메일"
                                    value={userData.email}
                                    className="email"
                                    onChange={(e) =>
                                    setUserData(prev => ({
                                        ...prev,
                                        email: e.target.value
                                    }))
                                    }
                                />

                                <select
                                    value={userData.emailDomain}
                                    onChange={(e) =>
                                    setUserData(prev => ({
                                        ...prev,
                                        emailDomain: e.target.value
                                    }))
                                    }
                                >
                                    {domainList.map(domain => (
                                    <option key={domain} value={domain}>
                                        {domain}
                                    </option>
                                    ))}
                                </select>
                                </div>
                            </label>
                            );
                        }
                        if(form.name === "passwordCheck"){
                            return(
                                <label key={form.name}>
                                    <input type={"password"} 
                                    name={"비밀번호 확인"}
                                    placeholder={"비밀번호 확인"}
                                    value={userData.passwordCheck}
                                    onChange={(e) => {
                                        const val = e.target.value;

                                        setUserData(prev => ({
                                            ...prev,
                                            passwordCheck: val
                                        }));
                                        setPwError(userData.password != val);
                                    }}
                                    onFocus={() => setPwFocus(true)}
                                    onBlur={() => setPwFocus(false)}
                                    />
                                    
                                    {pwFocus && userData.passwordCheck && (
                                    pwError ? (
                                        <p className="check">❌ 비밀번호가 다릅니다</p>
                                    ) : (
                                        <p className="check">✔️ 비밀번호가 일치합니다</p>
                                    )
                                    )}
                                </label>
                            )
                        }
                        return (
                            <label key={form.name}>
                            <input
                                name={form.name}
                                type={form.type || "text"}
                                placeholder={form.text}
                                value={userData[form.name as keyof typeof userData]}
                                onChange={handleUserChange}
                            />
                            </label>
                        );
                        })}

                        {/* 버튼 */}
                        <div className="button-content">
                            <ButtonComponent
                            text="회원가입"
                            event={handleSignup}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}