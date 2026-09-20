/**
 * 把結構化資料塞進頁面。
 *
 * 用 script 標籤而不是 <meta>，是因為 JSON-LD 才能表達巢狀關係
 * （一課有很多步驟、一頁有很多問答）。Google 與各家答案引擎都吃這一種。
 *
 * 內容全部來自建置期的靜態資料，沒有使用者輸入，所以 dangerouslySetInnerHTML
 * 在這裡是安全的。額外把 `<` 逃脫掉，避免內容剛好含有 `</script` 把標籤提早關掉。
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
