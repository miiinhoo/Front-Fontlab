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
    // 유저 로그인
    const handleLogin = async() => {
      try{
        await login(tempA, tempB); // tempA: email tempB: pw로 지정..
        toast.success("로그인 성공.")
      }catch(error){
        toast.error(`로그인 실패 error code : ${error}`)
      }
    }
    // 유저 회원가입
    const handleSignup = async () => {
    try {
      await signup(tempA, tempB, tempC); // tempA: email tempB: pw tempC: username
      toast.success("회원가입 성공!");
    } catch (err: any) {
      toast.error(err.code);
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

      // 이벤트 핸들러
      handleChange,
      handleSave,
      handleDelete,

      // 유저 페이지 핸들러
      handleLogin,
      handleSignup,
    }
}