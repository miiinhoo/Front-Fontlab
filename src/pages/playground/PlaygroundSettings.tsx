// src/pages/playground/PlaygroundSettings.tsx

import { useEffect, useState } from "react";
import useCustomhook from "../../hooks/useCustomhook";
import { getFont } from "../../api/fontsService";
import { loadFontOnce, getGoogleFontUrl } from "../../utils/loadFontOnce";

import useFontSettings from "../../hooks/useFontSettings";
import { SettingBlocks, unitRanges } from "../../arrays/SettingsConfig";
import ButtonComponent from "../../components/common/ButtonComponent";
import toast from "react-hot-toast";

type EmbedType = "import" | "link";

export default function PlaygroundSettings() {
  const { id, item, setItem, handleSave, handleDelete, navigate, loc } = useCustomhook();
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

    // 미리보기인 경우
    if (id === "preview") {
      const searchParams = new URLSearchParams(loc.search);
      const family = searchParams.get("family") || "Roboto";

      setItem({
        family: family,
        text: "FontLab Preview",
        size: 32,
        sizeUnit: "px",
        weight: 400,
        style: "normal",
        spacing: 0,
        spacingUnit: "px",
        height: 1.5,
      });
      return;
    }

    // 실제 데이터 조회 경우
    getFont(id).then((res) => {
      setItem({
        ...res,
        // 이미 저장된 단위가 있으면 그대로 사용, 없으면 px로 초기화
        sizeUnit: (res as any).sizeUnit ?? "px",
        spacingUnit: (res as any).spacingUnit ?? "px",
      });

  
    });
  }, [id, loc.search]);

  if (!item) return <div>Loading...</div>;

  const isPreview = id === "preview";

   // 임베드 코드 문자열 생성
  const fontUrl = getGoogleFontUrl(item.family, item.weight, item.style === "italic");
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
      <div className="settings-content">
        <div className="settings-left">
          <div className="settings-header">
            <h2>{item.family}</h2>
            {item.customname && (
              <p className="preset-name">별칭: {item.customname}</p>
            )}
          </div>

          <div className="preview-card">
            <textarea
              value={item.text}
              placeholder="글자를 입력해보세요.."
              onChange={(e) => setItem({ ...item, text: e.target.value })}
            />
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
          </div>

          <div className="codes-row">
            <div className="codes">
              <div className="codes-header">
                <h3>Import</h3>
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

              <pre
                className="embed-code"
                style={{ height: "120px", whiteSpace: "pre-wrap", overflowY: "auto" }}
              >
                <code>{embedCode}</code>
              </pre>

              <ButtonComponent
                text="임베드 복사"
                event={handleCopyEmbed}
                cln="copybtn"
              />
            </div>

            <div className="codes">
              <div className="codes-header">
                <h3>CSS</h3>
              </div>
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
          </div>
        </div>

        <div className="right-content">
          <div className="btn-row">
            <ButtonComponent 
              text={isPreview ? "컬렉션에 저장" : "업데이트"}
              event={handleSave}
              cln="savebtn"
            />
            {!isPreview && (
              <ButtonComponent
                text="삭제"
                event={handleDelete}
                cln="delbtn"
              />
            )}
            <ButtonComponent
              text="리스트"
              event={() => navigate(`/playground/list/${encodeURIComponent(item.family)}`)}
            />
          </div>

          <div className="settings-wrapper">
            {SettingBlocks.map((block) => {
              const key = block.key;
              const unit = item[key + "Unit"] || "px";
              const range = block.range ?? (unitRanges as any)[key][unit];

              return (
                <div key={key} className="setting-block">
                  <label className="block-text-wrapper">
                    <span className="block-text">
                      {block.label}
                    </span>
                    <span className="block-text">
                      {item[key]}{block.unit ? unit : ""} 
                    </span>
                    
                    
                  </label>

                  {(block.type === "slider" || block.type === "slider-preset") && (
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

                  {block.unit && (
                    <div className="unit-row">
                      {["px", "rem", "em"].map((u) => (
                        <label key={u} className="unit-btn">
                          <input
                            type="radio"
                            checked={unit === u}
                            onChange={() => changeUnit(key, u)}
                          />
                          <span>{u}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {block.type === "slider-preset" && (
                    <div className="unit-row">
                      {block.presets?.map((p: any) => (
                        <label key={p.value} className="unit-btn">
                          <input
                            type="radio"
                            checked={item[key] === p.value}
                            onChange={() => changePreset(key, p.value)}
                          />
                          <span>{p.label}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {block.type === "preset" && block.presets && (
                    <div className="unit-row">
                      {block.presets.map((p) => (
                        <label key={p.value} className="unit-btn">
                          <input
                            type="radio"
                            checked={item[key] === p.value}
                            onChange={() => changePreset(key, p.value)}
                          />
                          <span>{p.label}</span>
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

        </div>
      </div>
    </div>
    </>
  );
}
