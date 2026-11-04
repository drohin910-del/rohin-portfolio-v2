export const fmtInt = (v: number) => Math.round(v).toLocaleString("en-GB");
export const fmtBn = (v: number, cur: "€" | "$") => `${cur}${(v / 1000).toFixed(1)}bn`;
export const fmtPct = (v: number) => `${v.toFixed(1)}%`;
export const fmtEurM = (v: number) => `€${Math.round(v).toLocaleString("en-GB")}m`;
export const fmtUsdM = (v: number) => `$${Math.round(v).toLocaleString("en-GB")}m`;
