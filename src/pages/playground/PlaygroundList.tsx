import { useEffect, useState } from "react";
import useCustomhook from "../../hooks/useCustomhook";
import { getFonts } from "../../api/fontsService";
import useGoogleFonts from "../../hooks/useGoogleFonts";
import SelectComponent from "../../components/SelectComponent";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import PlaygroundSkeleton from "../../components/skeleton/PlaygroundSkeleton";

export default function PlaygroundList() {
  const { item, setItem,navigate } = useCustomhook();
  const { search, setSearch, category, setCategory } = useGoogleFonts();

  // playground용 로딩 판별
  const [ loading , setLoading ] = useState(true);
  useEffect(() => {
    const font = onAuthStateChanged(auth, async(user) => {
      setLoading(true);
      if(!user) {
        setItem([]); // 로그인 안된상태시 비우기
        setLoading(false);
        return;
      }
      const data = await getFonts(user.uid);
      setItem(data);  
      setLoading(false);
    })
    return () => font();
  }, []);

  if(loading) return <PlaygroundSkeleton/>;
  // 비로그인 상태일시
  if (!auth.currentUser) return <div className="page-inner">로그인이 필요합니다.</div>;

  // 저장된 폰트가 없을 시
  if (!item || item.length === 0) return <div className="page-inner">저장된 폰트가 없습니다.</div>

  // PlaygroundList 페이지 customname || family 기준 select 필터
    const filtered = item.filter((font:any) =>
      font.family.toLowerCase().includes(search.toLowerCase()) ||
      font.customname?.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <section>

    <div className="page-inner">
      <p className="top-box" style={{ display:"block", height:"40px", width:"100%"}}>
        <div className="right-box" style={{ float:"right"}}>
          <input
            placeholder="폰트이름 또는 별칭 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <SelectComponent
            values={category}
            event={(e) => setCategory(e.target.value)}
          >
            <option value="all">전체</option>
            <option value="sans-serif">고딕체</option>
            <option value="serif">명조체</option>
            <option value="display">디스플레이</option>
            <option value="handwriting">손글씨</option>
            <option value="monospace">고정폭</option>
          </SelectComponent>
        </div>
        
      </p>
      <div className="font-grid">
      {
        loading
        ? Array.from({ length:6 }).map((_,i) => (
          <PlaygroundSkeleton key={i}/>
        ))
        :
        filtered.map((font: any) => (
        <div
          key={font.id}
          className="font-card row"
          onClick={() => navigate(`/playground/settings/${font.id}`)}
        >
          <h3 style={{ fontFamily: font.family }}>{font.family}</h3>

          {/* 폰트 정보들 있으면 표시 */}
          <div className="font">
            {font.size && <span>글자크기: {font.size}{font.sizeUnit}</span>}
            {font.weight && <span>두께: {font.weight}</span>}
            {font.style && <span>스타일: {font.style}</span>}
            <span>간격: {font.spacing}{font.spacingUnit}</span>
            {font.customname && <span>별칭: {font.customname}</span>}
          </div>
        </div>
      ))
      }
    </div>
    </div>
    </section>
  );
}
