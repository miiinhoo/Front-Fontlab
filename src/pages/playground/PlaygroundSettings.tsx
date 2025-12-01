// src/pages/playground/PlaygroundSettings.tsx

import { useEffect } from "react";
import useCustomhook from "../../hooks/useCustomhook";
import { getFont } from "../../api/FontsService";
import { loadFontOnce } from "../../utils/loadFontOnce";

import useFontSettings from "../../hooks/useFontSettings";
import { SettingBlocks, unitRanges } from "../../arrays/SettingsConfig";

export default function PlaygroundSettings() {
  const { id, item, setItem, handleSave, handleDelete, navigate } = useCustomhook();
  const { changeUnit, changeValue, getRange, changePreset } =
    useFontSettings(item, setItem);

  
    useEffect(() => {
      if (!item) return;

      loadFontOnce(
        item.family,
        item.weight,
        item.style === "italic" || item.style === "oblique"
      );
    }, [item?.weight, item?.style, item?.family]);


  useEffect(() => {
    if (!id) return;

    getFont(id).then((res) => {
      setItem({
        ...res,
        sizeUnit: "px",
        spacingUnit: "px",
        heightUnit: "px",
      });

      loadFontOnce(res.family, ["100", "300", "400", "700"]);
    });
  }, [id]);

  if (!item) return <div>Loading...</div>;

  return (
    <>
      <div className="page-inner">
      <h2>{item.family}</h2>

      <div
        className="preview"
        style={{
          fontFamily: item.family,
          fontSize: `${item.size}${item.sizeUnit}`,
          fontWeight: item.weight,
          fontStyle: item.style,
          letterSpacing: `${item.spacing}${item.spacingUnit}`,
        }}
      >
        {item.text || "FontLab123!@#$%"}
      </div>

      <textarea
        value={item.text}
        onChange={(e) => setItem({ ...item, text: e.target.value })}
      />

      {SettingBlocks.map((block) => {
        const key = block.key;
        const unit = item[key + "Unit"] || "px";
        const range = getRange(key, unit);

        return (
          <div key={key} className="setting-block">
            <label>
              {block.label}: {item[key]}
              {block.unit ? unit : ""}
            </label>

            {/* SLIDER */}
            {(block.type === "slider" || block.type === "slider-preset") && (
              <input
                type="range"
                min={block.range?.min ?? unitRanges.size.px.min}
                max={block.range?.max ?? unitRanges.size.px.max}
                step={block.range?.step ?? unitRanges.size.px.step}
                value={item[block.key]}
                onChange={(e) => changeValue(key, Number(e.target.value))}
              />
            )}

            {/* UNIT */}
            {block.unit && (
              <div className="unit-row">
                {["px", "rem", "em"].map((u) => (
                  <label key={u}>
                    <input
                      type="radio"
                      checked={unit === u}
                      onChange={() => changeUnit(key, u)}
                    />
                    {u}
                  </label>
                ))}
              </div>
            )}

            {/* PRESETS */}
            {block.type === "slider-preset" && (
              <div className="unit-row">
                {block.presets?.map((p: any) => (
                  <label key={p.value}>
                    <input
                      type="radio"
                      checked={item[key] === p.value}
                      onChange={() => changePreset(key, p.value)}
                    />
                    {p.label}
                  </label>
                ))}
              </div>
            )}

            {block.type === "preset" && block.presets && (
            <div className="unit-row">
              {block.presets.map((p) => (
                <label key={p.value}>
                  <input
                    type="radio"
                    checked={item[key] === p.value}
                    onChange={() => changePreset(key, p.value)}
                  />
                  {p.label}
                </label>
              ))}
            </div>
          )}
          </div>
        );
      })}

      <div className="btn-row">
        <button onClick={handleSave}>저장</button>
        <button onClick={handleDelete} className="danger">
          삭제
        </button>
        <button onClick={() => navigate("/playground")}>목록</button>
      </div>
    </div>
    </>
  );
}
