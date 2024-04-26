import { CardTheme } from "@libs/types/src/card.ts";

export const TH_BLACK = "#00060c";
export const TH_BLACK_00 = "#00060c00";
export const TH_BLACK_20 = "#00060c33";
export const TH_BLACK_40 = "#00060c66";
export const TH_BLACK_80 = "#00060ccc";

export const TH_DARKER_BLUE = "#001528";

export const TH_SKY = "#3fa1ff";
export const TH_SKY_10 = "#3fa1ff19";
export const TH_SKY_20 = "#3fa1ff33";

export const TH_RED = "#f31260";
export const TH_RED_10 = "#f3126019";
export const TH_RED_60 = "#f3126099";

export const TH_WHITE = "#f4f7fb";
export const TH_WHITE_00 = "#f4f7fb00";
export const TH_WHITE_05 = "#f4f7fb0d";
export const TH_WHITE_07 = "#f4f7fb12";
export const TH_WHITE_10 = "#f4f7fb19";
export const TH_WHITE_15 = "#f4f7fb26";
export const TH_WHITE_20 = "#f4f7fb33";
export const TH_WHITE_50 = "#f4f7fb7f";
export const TH_WHITE_60 = "#f4f7fb99";
export const TH_WHITE_65 = "#f4f7fba6";
export const TH_WHITE_70 = "#f4f7fbb2";
export const TH_WHITE_80 = "#f4f7fbcc";
export const TH_WHITE_85 = "#f4f7fbd9";
export const TH_WHITE_90 = "#f4f7fbe6";

export const colors: Record<CardTheme, Record<"500" | "700", string>> = {
	red: {
		500: "#ef4444",
		700: "#b91c1c"
	},
	orange: {
		500: "#f97316",
		700: "#c2410c"
	},
	yellow: {
		500: "#eab308",
		700: "#a16207"
	},
	green: {
		500: "#22c55e",
		700: "#15803d"
	},
	emerald: {
		500: "#10b981",
		700: "#047857"
	},
	teal: {
		500: "#14b8a6",
		700: "#0f766e"
	},
	cyan: {
		500: "#06b6d4",
		700: "#0e7490"
	},
	sky: {
		500: "#0ea5e9",
		700: "#0369a1"
	},
	blue: {
		500: "#3b82f6",
		700: "#1d4ed8"
	},
	indigo: {
		500: "#6366f1",
		700: "#4338ca"
	},
	violet: {
		500: "#8b5cf6",
		700: "#6d28d9"
	},
	purple: {
		500: "#a855f7",
		700: "#7e22ce"
	},
	fuchsia: {
		500: "#d946ef",
		700: "#a21caf"
	},
	pink: {
		500: "#ec4899",
		700: "#be185d"
	},
	rose: {
		500: "#f43f5e",
		700: "#be123c"
	}
};
