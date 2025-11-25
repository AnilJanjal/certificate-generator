export async function engToMarathi(text) {
  if (!text) return "";
  const resp = await fetch(
    `https://inputtools.google.com/request?text=${encodeURIComponent(
      text
    )}&itc=mr-t-i0-und&num=1`
  );
  const data = await resp.json();
  // Returns first suggested Marathi transliteration
  return data[1][0][1][0] || text;
}
