// src/pages/playground/PlaygroundSettings.tsx

import { useEffect } from "react";
import useCustomhook from "../../hooks/useCustomhook";
import { getFont } from "../../api/FontsService";
import { loadFontOnce } from "../../utils/loadFontOnce";

import useFontSettings from "../../hooks/useFontSettings";
import { SettingBlocks, unitRanges } from "../../arrays/SettingsConfig";
import ButtonComponent from "../../components/common/ButtonComponent";
import toast from "react-hot-toast";

export default function PlaygroundSettings() {
  const { id, item, setItem, handleSave, handleDelete, navigate } = useCustomhook();
  const { changeUnit, changeValue, changePreset } =
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

      <div className="settings-content">
      {/** 세팅페이지 input range,radio, textarea등 묶음.. */}
      <div className="settings-wrapper">
          <textarea
            value={item.text}
            onChange={(e) => setItem({ ...item, text: e.target.value })}
          />

          {SettingBlocks.map((block) => {
            const key = block.key;
            const unit = item[key + "Unit"] || "px";
            
            const range = block.range ?? unitRanges[key][unit];
            
            return (
              <div key={key} className="setting-block">
                <label>
                  {block.label}: {item[key]}
                  {block.unit ? unit : ""}
                </label>
                
                {/* SLIDER */}
                {(block.type === "slider" || block.type === "slider-preset")&&(
                  <input
                    type="range"
                    className="range-bar"
                    min={range.min}
                    max={range.max}
                    step={range.step}
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
          <input 
          type="text" 
          placeholder="커스텀 네임을 작성하세요.."
          name="customname"
          value={item.customname || ""}
          onChange={(e) => setItem({ ...item, customname: e.target.value })}
          />
      </div>
      <div className="right-content">
      {/** 코드 복붙기능 */}
      <div className="codes">
        <p className="row">
          <strong>font-size</strong>:<span>{item.size}</span><small>{item.sizeUnit}</small>;
        </p>
        <p className="row">
          <strong>font-weight</strong>:<span>{item.weight}</span>;
        </p>
        <p className="row">
          <strong>font-style</strong>:<span>{item.style}</span>;
        </p>
        <p className="row">
          <strong>letter-spacing</strong>:<span>{item.spacing}</span><small>{item.spacingUnit}</small>;
        </p> 
        <ButtonComponent 
          text="코드 복사"
          event={() => {
            try{
            const css = [
              `font-size: ${item.size}${item.sizeUnit};`,
              `font-weight: ${item.weight};`,
              `font-style: ${item.style};`,
              `letter-spacing: ${item.spacing}${item.spacingUnit};`,
            ].join("\n");
            navigator.clipboard.writeText(css);
            toast.success("코드를 복사했습니다.")
            }catch(error){
              toast.error("복사하는 과정에서 에러가 발생했습니다.")
            }
          }}
          cln="copybtn"
        />

      </div>
      {/** 버튼 */}
      <div className="btn-row">
        <ButtonComponent 
        text="저장"
        event={handleSave}
        cln="savebtn"
        />
        <ButtonComponent
        text="삭제"
        event={handleDelete}
        cln="delbtn"
        />
        <ButtonComponent
        text="리스트"
        event={() => navigate("/playground")}
        />
      </div>
      </div>
      </div>
    </div>
    </>
  );
}
