import { useEffect } from "react";
import useCustomhook from "../../hooks/useCustomhook";
import { getFonts } from "../../api/FontsService";
import { useNavigate } from "react-router-dom";

export default function PlaygroundList() {
  const { item, setItem } = useCustomhook();
  const navigate = useNavigate();

  useEffect(() => {
    getFonts().then((res) => setItem(res));
  }, []);

  if (!item || item.length === 0) {
    return <div>저장된 폰트가 없습니다.</div>;
  }

  return (
    <div className="page-inner">
      <div className="font-grid">
      {item.map((font: any) => (
        <div
          key={font.id}
          className="font-card"
          onClick={() => navigate(`/playground/settings/${font.id}`)}
        >
          <h3>{font.family}</h3>

          {/* 폰트 정보들 있으면 표시 */}
          <div className="font">
            {font.size && <span>Size: {font.size}{font.sizeUnit}</span>}
            {font.weight && <span>Weight: {font.weight}</span>}
            {font.style && <span>Style: {font.style}</span>}
            {font.spacing && <span>Spacing: {font.spacing}{font.spacingUnit}</span>}
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}
