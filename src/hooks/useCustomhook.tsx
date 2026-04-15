import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createFont, deleteFont, updateFont } from "../api/fontsService";
import toast from "react-hot-toast";
import { AuthStore } from "../store/AuthStore";


export default function useCustomhook(){
    const navigate = useNavigate();
    const loc = useLocation();
    const { id } = useParams();
    const user = AuthStore(state => state.user);

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
      if (id === "preview") {
        if (!user) {
          return toast.error("로그인 후 저장할 수 있습니다.");
        }
        try {
          const res = await createFont({
            ...item,
            createdAt: Date.now(),
            userId: user.uid,
          });
          toast.success("컬렉션에 저장되었습니다.");
          return navigate(`/playground/settings/${res.id}`);
        } catch (error) {
          return toast.error("저장에 실패했습니다.");
        }
      }

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

    // 폰트 선택 핸들러 (로그인 여부에 따라)
    const handleSelect = async (font: any) => {
      const fontFamily = typeof font === "string" ? font : font.family;

      // 로그인이 안 되어 있으면 프리뷰 모드로 이동
      if (!user) {
        toast("미리보기 모드입니다. 저장을 원하시면 로그인해주세요.");
        return navigate(`/playground/settings/preview?family=${fontFamily}`);
      }

      // 로그인이 되어 있으면 바로 DB에 저장하고 이동
      try {
        const res = await createFont({
          family: fontFamily,
          text: "",
          size: 32,
          weight: 400,
          style: "normal",
          spacing: 0,
          height: 1.5,
          createdAt: Date.now(),
        });
        navigate(`/playground/settings/${res.id}`);
      } catch (error) {
        toast.error("폰트 저장 중 에러가 발생했습니다.");
        console.error(error);
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

      // 이벤트 핸들러
      handleChange,
      handleSave,
      handleDelete,

      handleSelect,
    }
}