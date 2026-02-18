import "./User.scss";
import type { JSX } from "react";
import { UserArray } from "../../arrays/UserArrays";
import useCustomhook from "../../hooks/useCustomhook";
import ButtonComponent from "../../components/common/ButtonComponent";

export default function UserSignup():JSX.Element{

    const { userData, setUserData, handleSignup, handleUserChange } = useCustomhook();

    const domainList = [
    "naver.com",
    "daum.net",
    "gmail.com",
    "직접입력"
    ];

    

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
                                <div style={{ display: "flex", gap: "5px" }}>
                                <input
                                    type="text"
                                    placeholder="이메일"
                                    value={userData.email}
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