// src/pages/playground/PlaygroundSettings.tsx

import { useEffect, useState } from "react";
import useCustomhook from "../../hooks/useCustomhook";
import { getFont } from "../../api/fontsService";
import { loadFontOnce } from "../../utils/loadFontOnce";

import useFontSettings from "../../hooks/useFontSettings";
import { SettingBlocks, unitRanges } from "../../arrays/SettingsConfig";
import ButtonComponent from "../../components/common/ButtonComponent";
import toast from "react-hot-toast";

function buildGoogleFontUrl(family: string, weight: number, style: string) {
  // 예: "Noto Sans" => "Noto+Sans"
  const familyParam = family.replace(/ /g, "+");
  const isItalic = style === "italic" || style === "oblique";
  // ital,wght 축 사용 (구글폰트 v2 API 방식)
  const axis = isItalic ? `ital,wght@1,${weight}` : `wght@${weight}`;
  return `https://fonts.googleapis.com/css2?family=${familyParam}:${axis}&display=swap`;
}

type EmbedType = "import" | "link";

export default function PlaygroundSettings() {
  const { id, item, setItem, handleSave, handleDelete, navigate } = useCustomhook();
  const { changeUnit, changeValue, changePreset } =
    useFontSettings(item, setItem);

  // @import / <link> 선택 상태
  const [embedType, setEmbedType] = useState<EmbedType>("import");
  
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

  
    });
  }, [id]);

  if (!item) return <div>Loading...</div>;

   // 임베드 코드 문자열 생성
  const fontUrl = buildGoogleFontUrl(item.family, item.weight, item.style);
  const embedCode =
    embedType === "import"
      ? `@import url('${fontUrl}');`
      : `<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="${fontUrl}" rel="stylesheet">`;

  const handleCopyEmbed = () => {
    try {
      navigator.clipboard.writeText(embedCode);
      toast.success("임베드 코드를 복사했습니다.");
    } catch {
      toast.error("복사하는 과정에서 에러가 발생했습니다.");
    }
  };

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
            placeholder="글자를 입력해보세요.."
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
          placeholder="별칭을 작성하세요.."
          name="customname"
          className="customname"
          value={item.customname || ""}
          onChange={(e) => setItem({ ...item, customname: e.target.value })}
          />
      </div>
      <div className="right-content">
      <div className="codes">
              <div className="codes-header">
                <h3>Import</h3>
                {/* @import / <link> radio 선택 */}
                <div className="unit-row">
                  <label>
                    <input
                      type="radio"
                      checked={embedType === "import"}
                      onChange={() => setEmbedType("import")}
                    />
                    @import
                  </label>
                  <label>
                    <input
                      type="radio"
                      checked={embedType === "link"}
                      onChange={() => setEmbedType("link")}
                    />
                    &lt;link&gt;
                  </label>
                </div>
              </div>

              {/* 임베드 코드 표시 */}
              <pre className="embed-code">
                <code>{embedCode}</code>
              </pre>

              <ButtonComponent
                text="임베드 복사"
                event={handleCopyEmbed}
                cln="copybtn"
              />
          </div>
      {/** 코드 복붙기능 */}
      <div className="codes">
        <h3>CSS</h3>
        <br />
        <p className="row">
          <strong>font-family</strong>:<span>'{item.family}', sans-serif</span>
        </p>
        <p className="row">
          <strong>font-size</strong>:<span className="lightgreen">{item.size}{item.sizeUnit}</span>;
        </p>
        <p className="row">
          <strong>font-weight</strong>:<span>{item.weight}</span>;
        </p>
        <p className="row">
          <strong>font-style</strong>:<span>{item.style}</span>;
        </p>
        <p className="row">
          <strong>letter-spacing</strong>:<span className="lightgreen">{item.spacing}{item.spacingUnit}</span>;
        </p> 
        <br />
        <ButtonComponent 
          text="코드 복사"
          event={() => {
            try{
            const css = [
              `font-family: '${item.family}', sans-serif;`,
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
