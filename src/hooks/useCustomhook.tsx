import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { deleteFont, updateFont } from "../api/FontsService";
import toast from "react-hot-toast";
import { login, signup } from "../api/FirebaseAPI";

export default function useCustomhook(){
    const navigate = useNavigate();
    const loc = useLocation();
    const { id } = useParams();
    // 불타입
    const [ bool, setBool ] = useState<boolean>(false);
    // 문자열타입
    const [ tempA, setTempA ] = useState<string>("");
    const [ tempB, setTempB ] = useState<string>("");
    const [ tempC, setTempC ] = useState<string>("");
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
      try{
        await login(email, password); // tempA: email tempB: pw로 지정..
        toast.success("로그인 성공.");
        navigate("/");
      }catch(error:any){
        if (error.code === "auth/user-not-found") toast.error("해당 이메일의 계정이 없습니다.");
        else if (error.code === "auth/invalid-email") toast.error("해당 이메일의 계정이 없습니다.")
        else if (error.code === "auth/wrong-password") toast.error("비밀번호가 잘못되었습니다.");
      }
    }
    // 유저 회원가입
    const handleSignup = async () => {
      const { email, password, passwordCheck, username } = userData;
      
    if (!email || !password || !username) {
      toast.error("모든 항목을 입력해주세요.");
      return;
    }

    if (password !== passwordCheck) {
      toast.error("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await signup(email, password, username); // tempA: email tempB: pw tempC: username
      toast.success("회원가입 성공!");
      navigate("/user/login");
    } catch (err: any) {
      if (err.code === "auth/invalid-email") toast.error("이메일 형식이 올바르지 않습니다.");
      else if (err.code === "auth/email-already-in-use") toast.error("이미 사용 중인 이메일입니다.");
      else toast.error("회원가입 실패");
    }
    };

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
      setTempB,
      setTempC,
      userData,

      // 이벤트 핸들러
      handleChange,
      handleSave,
      handleDelete,

      // 유저 페이지 핸들러
      handleLogin,
      handleSignup,
      handleUserChange
    }
}