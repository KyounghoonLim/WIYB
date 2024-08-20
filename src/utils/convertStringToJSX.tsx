/**
 * <strong></strong> 태그만 허용
 */
export function convertStringToTSX(text: string, strongClassName: string = "") {
  if (!text || !text.includes("<strong>") || !text.includes("</strong>")) return text;
  else {
    const splitedText = text.replaceAll("<strong>", "{{replaced}}").replaceAll("</strong>", "{{replaced}}").split("{{replaced}}");
    return splitedText.map((t, idx) => {
      if (idx % 2 !== 1) return t;
      else
        return (
          <strong className={strongClassName} key={`${t}-${idx}`}>
            {t}
          </strong>
        );
    });
  }
}
