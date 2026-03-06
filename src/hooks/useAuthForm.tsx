import { useState } from "react";
import toast from "react-hot-toast";
import { login, logout, signup } from "../api/FirebaseAPI";
import { useLocation, useNavigate } from "react-router-dom";

export default function useAuthForm(){

    const loc = useLocation();

    const navigate = useNavigate();

    // 유저페이지
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        emailDomain: "naver.com",
        password: "",
        passwordCheck: "",
      });
      
  
      const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
  
        setUserData(prev => ({
          ...prev,
          [name]: value,
        }));
      };
      
      // 유저 로그인
      
      const handleLogin = async() => {
        const { email, password } = userData;
        
        // 폼검증
        if (!email || !password) {
          toast.error("이메일과 비밀번호를 입력해주세요.");
          return;
        }
  
        if (!email.includes("@")) {
          toast.error("이메일 형식이 올바르지 않습니다.");
          return;
        }
        try{
          await login(email, password); // tempA: email tempB: pw로 지정..
          toast.success("로그인 성공.");
  
          const from = loc.state?.from?.pathname || "/";
          navigate(from, {replace: true});
  
        }catch(error:any){
          toast.error("이메일 또는 비밀번호가 올바르지 않습니다.");
        }
      }
      // 유저 회원가입
      const handleSignup = async () => {
        const { email, emailDomain, password, passwordCheck, username } = userData;
        
        const fullEmail =
        emailDomain === "직접입력"
          ? email
          : `${email}@${emailDomain}`;
  
      // --폼검증
      // 모두 빈칸?
      if (!fullEmail || !password || !username) {
        toast.error("모든 항목을 입력해주세요.");
        return;
      }
      // 이메일 형식 불일치
      if(!fullEmail.includes("@")) {
        toast.error("이메일 형식이 올바르지 않습니다..");
        return;
      }
      // 비밀번호 길이제한
      if(password.length < 6){
        toast.error("비밀번호는 6자이상이여야 합니다.");
        return;
      }
      // 패스워드 일치여부
      if (password !== passwordCheck) {
        toast.error("비밀번호가 일치하지 않습니다.");
        return;
      }
  
      try {
        await signup(fullEmail, password, username); // email+드롭다운(ex:naver.com)이 합쳐진 fullEmail과 비밀번호,닉네임을 서버에 넘김.
        toast.success("회원가입 성공!");
        navigate("/user/login");
      } catch (err: any) {
        if (err.code === "auth/email-already-in-use") {
        toast.error("이미 사용 중인 이메일입니다.");
        } else {
          toast.error("회원가입 실패");
        }
      }
      };
  
      const handleLogout = async () => {
        try{
          /** 로그아웃 확인 */
          const cf = window.confirm("로그아웃을 하시겠습니까?");
          if(!cf) return;
  
          await logout();
          navigate("/explore");
          
          toast.success("로그아웃 완료되었습니다.");
        }catch(err:any){
          toast.error(`로그아웃 실패하였습니다. 에러 : ${err}`);
        }
      }
    return{
        // 유저 정보 기본값 반환
        userData,
        setUserData,
        // 유저 로그인/회원가입/로그아웃 관련 기능
        handleUserChange,
        handleLogin,
        handleSignup,
        handleLogout,
    }
}