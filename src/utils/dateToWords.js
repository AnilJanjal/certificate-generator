import numberToWords from "number-to-words";

// Convert number like 2008 → TWO THOUSAND EIGHT
function yearToWords(year) {
  const thousands = Math.floor(year / 1000);
  const remainder = year % 1000;

  let words = "";
  if (thousands > 0) {
    words += numberToWords.toWords(thousands) + " THOUSAND";
  }
  if (remainder > 0) {
    words += " " + numberToWords.toWords(remainder);
  }
  return words.trim().toUpperCase(); // Make entire year uppercase
}

export function dateToWords(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);
  const day = date.getDate(); // 1-31
  const month = date.toLocaleString("en-US", { month: "long" }); // December
  const year = date.getFullYear();

  const dayWord = numberToWords.toOrdinal(day).toUpperCase(); // TWENTY-EIGHTH
  const monthWord = month.toUpperCase(); // DECEMBER
  const yearWord = yearToWords(year); // TWO THOUSAND EIGHT

  return `${dayWord} ${monthWord} ${yearWord}`;
}
