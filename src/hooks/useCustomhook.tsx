import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { deleteFont, updateFont } from "../api/fontsService";
import toast from "react-hot-toast";
import { login, logout, signup } from "../api/FirebaseAPI";


export default function useCustomhook(){
    const navigate = useNavigate();
    const loc = useLocation();
    const { id } = useParams();
    // 불타입
    const [ bool, setBool ] = useState<boolean>(false);
    // 문자열타입
    const [ tempA, setTempA ] = useState<string>("");
    // 모든타입
    const [ item, setItem ] = useState<any>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | 
      HTMLSelectElement 
      | HTMLTextAreaElement
      >):void => {
      setTempA(e.target.value);
    }
    // 폰트 저장 핸들러
    const handleSave = async() => {
      try{
        await updateFont(id!, item);
        toast.success(`저장에 성공하였습니다.`);
        navigate("/playground");
      }catch(error){
        toast.error(`저장에 실패했습니다.${error}`);
      };
    }
    // 폰트 삭제 핸들러
    const handleDelete = async() => {
      const isConfirmed = window.confirm("커스텀 폰트를 삭제하시겠습니까?");
      if(!isConfirmed) return;
      try{
        await deleteFont(id!);
        toast.success(`삭제에 성공하였습니다.`);
        navigate("/playground");
      }catch(error){
        toast.error(`삭제에 실패했습니다.${error}`);
      };
    }

    
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
      // 페이지 이동/위치
      navigate,
      loc,

      // id
      id,

      // 현재 수정 중인 문서
      item,
      setItem,

      // 부가 상태
      tempA,
      bool,
      setBool,
      setTempA,
      userData,
      setUserData,

      // 이벤트 핸들러
      handleChange,
      handleSave,
      handleDelete,

      // 유저 페이지 핸들러
      handleLogin,
      handleSignup,
      handleLogout,
      handleUserChange
    }
}