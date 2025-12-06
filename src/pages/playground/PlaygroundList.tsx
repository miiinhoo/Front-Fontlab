import { useEffect } from "react";
import useCustomhook from "../../hooks/useCustomhook";
import { getFonts } from "../../api/FontsService";
import { useNavigate } from "react-router-dom";
import useGoogleFonts from "../../hooks/useGoogleFonts";
import SelectComponent from "../../components/SelectComponent";

export default function PlaygroundList() {
  const { item, setItem } = useCustomhook();
  const { search, setSearch, category, setCategory } = useGoogleFonts();
  const navigate = useNavigate();

  useEffect(() => {
    getFonts().then((res) => setItem(res));
  }, []);

  if (!item || item.length === 0) {
    return <div>저장된 폰트가 없습니다.</div>;
  }

  // PlaygroundList 페이지 customname || family 기준 select 필터
    const filtered = item.filter((font:any) =>
      font.family.toLowerCase().includes(search.toLowerCase()) ||
      font.customname?.toLowerCase().includes(search.toLowerCase())
  );
  return (
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
      {filtered.map((font: any) => (
        <div
          key={font.id}
          className="font-card"
          onClick={() => navigate(`/playground/settings/${font.id}`)}
        >
          <h3>{font.family}</h3>

          {/* 폰트 정보들 있으면 표시 */}
          <div className="font">
            {font.family && <span style={{ fontFamily : font.family }}>family: {font.family}</span>}
            {font.size && <span>Size: {font.size}{font.sizeUnit}</span>}
            {font.weight && <span>Weight: {font.weight}</span>}
            {font.style && <span>Style: {font.style}</span>}
            {font.spacing && <span>Spacing: {font.spacing}{font.spacingUnit}</span>}
            {font.customname && <span>customname: {font.customname}</span>}
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}
