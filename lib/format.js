const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

// english digits -> bengali digits, so "1,850" becomes "১,৮৫০"
export function toBn(value) {
  return String(value).replace(/[0-9]/g, (digit) => bnDigits[Number(digit)]);
}

export function taka(value) {
  const number = Math.round(Number(value) || 0);
  return "৳ " + toBn(number.toLocaleString("en-US"));
}

export function percent(value) {
  const number = Math.abs(Number(value) || 0);
  return toBn(number.toFixed(1)) + "%";
}

export function unitLabel(unit) {
  const labels = {
    kg: "প্রতি কেজি",
    litre: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
    gram: "প্রতি গ্রাম",
  };
  return labels[unit] || "প্রতি " + unit;
}

// short unit for the ticker, "কেজি" instead of "প্রতি কেজি"
export function unitShort(unit) {
  const labels = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
    gram: "গ্রাম",
  };
  return labels[unit] || unit;
}

export function arrowOf(dir) {
  if (dir === "up") return "▲";
  if (dir === "down") return "▼";
  return "—";
}

export function changeLabel(dir) {
  if (dir === "up") return "দাম বেড়েছে";
  if (dir === "down") return "দাম কমেছে";
  return "দাম অপরিবর্তিত";
}

// badge colour classes for the price change
export function changeStyle(dir) {
  if (dir === "up") {
    return "border-brand-200 bg-brand-50 text-brand-700";
  }
  if (dir === "down") {
    return "border-red-200 bg-red-50 text-red-600";
  }
  return "border-slate-200 bg-slate-50 text-slate-500";
}

// markets are sorted by division so the table on the details page is easy to read
export function groupMarkets(markets = []) {
  const groups = [];
  markets.forEach((market) => {
    let group = groups.find((item) => item.division === market.division);
    if (!group) {
      group = { division: market.division, list: [] };
      groups.push(group);
    }
    group.list.push(market);
  });
  return groups;
}

// bengali date, used in the navbar and on the profile page
export function bnDate(value) {
  const date = value ? new Date(value) : new Date();
  const formatted = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(date);
  return toBn(formatted);
}
