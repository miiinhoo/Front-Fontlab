import { useEffect } from "react";
import useCustomhook from "../../hooks/useCustomhook";
import { getFont } from "../../api/fontsService";
import { loadFontOnce } from "../../utils/loadFontOnce";

export default function PlaygroundSettings() {
  const { id, item, setItem, handleSave, handleDelete, navigate } = useCustomhook();

  useEffect(() => {
    if (!id) return;

    getFont(id).then((res) => {
        console.log("🔥 getFont 결과:", res);
      setItem(res);
      loadFontOnce(res.family, ["400","700"]);
    });
  }, [id]);

  if (!item) return <div>Loading...</div>;

  return (
    <div className="settings-page">

      <h2>{item.family}</h2>

      {/* 미리보기 */}
      <div
        style={{
          fontFamily: item.family,
          fontSize: item.size + "px",
          fontWeight: item.weight,
          fontStyle: item.style,
          letterSpacing: item.spacing + "px",
          lineHeight: item.height,
        }}
        className="preview"
      >
        {item.text || `${item.family} 미리보기`}
      </div>

      {/* 텍스트 입력 */}
      <textarea
        value={item.text}
        onChange={(e) => setItem({ ...item, text: e.target.value })}
      />

      {/* 사이즈 조절 */}
      <label>Size: {item.size}px</label>
      <input
        type="range"
        min="10"
        max="120"
        value={item.size}
        onChange={(e) => setItem({ ...item, size: Number(e.target.value) })}
      />

      {/* 두께 */}
      <label>Weight: {item.weight}</label>
      <input
        type="range"
        min="100"
        max="900"
        step="100"
        value={item.weight}
        onChange={(e) => setItem({ ...item, weight: Number(e.target.value) })}
      />

      <button onClick={handleSave}>저장</button>
      <button onClick={handleDelete}>삭제</button>
      <button onClick={() => navigate("/playground")}>목록으로</button>

    </div>
  );
}
