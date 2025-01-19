import { CardTheme } from "@t/card.ts";

export const cardThemes: CardTheme[] = [
	"sky",
	"pink",
	"red",
	"cyan",
	"yellow",
	"blue",
	"green",
	"emerald",
	"fuchsia",
	"purple",
	"violet",
	"indigo",
	"orange",
	"teal",
	"rose"
];

export const CARD_RED_500 = "#EF4444";
export const CARD_RED_700 = "#B91C1C";

export const CARD_ORANGE_500 = "#F97316";
export const CARD_ORANGE_700 = "#C2410C";

export const CARD_YELLOW_500 = "#EAB308";
export const CARD_YELLOW_700 = "#A16207";

export const CARD_GREEN_500 = "#22C55E";
export const CARD_GREEN_700 = "#15803D";

export const CARD_EMERALD_500 = "#10B981";
export const CARD_EMERALD_700 = "#047857";

export const CARD_TEAL_500 = "#14B8A6";
export const CARD_TEAL_700 = "#0F766E";

export const CARD_CYAN_500 = "#06B6D4";
export const CARD_CYAN_700 = "#0E7490";

export const CARD_SKY_500 = "#0EA5E9";
export const CARD_SKY_700 = "#0369A1";

export const CARD_BLUE_500 = "#3B82F6";
export const CARD_BLUE_700 = "#1D4ED8";

export const CARD_INDIGO_500 = "#6366F1";
export const CARD_INDIGO_700 = "#4338CA";

export const CARD_VIOLET_500 = "#8B5CF6";
export const CARD_VIOLET_700 = "#6D28D9";

export const CARD_PURPLE_500 = "#A855F7";
export const CARD_PURPLE_700 = "#7E22CE";

export const CARD_FUCHSIA_500 = "#D946EF";
export const CARD_FUCHSIA_700 = "#A21CAF";

export const CARD_PINK_500 = "#EC4899";
export const CARD_PINK_700 = "#BE185D";

export const CARD_ROSE_500 = "#F43F5E";
export const CARD_ROSE_700 = "#BE123C";

export function getCardTheme(theme: CardTheme) {
	switch (theme) {
		case "red":
			return { from: CARD_RED_500, to: CARD_RED_700 };
		case "orange":
			return { from: CARD_ORANGE_500, to: CARD_ORANGE_700 };
		case "yellow":
			return { from: CARD_YELLOW_500, to: CARD_YELLOW_700 };
		case "green":
			return { from: CARD_GREEN_500, to: CARD_GREEN_700 };
		case "emerald":
			return { from: CARD_EMERALD_500, to: CARD_EMERALD_700 };
		case "teal":
			return { from: CARD_TEAL_500, to: CARD_TEAL_700 };
		case "cyan":
			return { from: CARD_CYAN_500, to: CARD_CYAN_700 };
		case "sky":
			return { from: CARD_SKY_500, to: CARD_SKY_700 };
		case "blue":
			return { from: CARD_BLUE_500, to: CARD_BLUE_700 };
		case "indigo":
			return { from: CARD_INDIGO_500, to: CARD_INDIGO_700 };
		case "violet":
			return { from: CARD_VIOLET_500, to: CARD_VIOLET_700 };
		case "purple":
			return { from: CARD_PURPLE_500, to: CARD_PURPLE_700 };
		case "fuchsia":
			return { from: CARD_FUCHSIA_500, to: CARD_FUCHSIA_700 };
		case "pink":
			return { from: CARD_PINK_500, to: CARD_PINK_700 };
		case "rose":
			return { from: CARD_ROSE_500, to: CARD_ROSE_700 };
	}
}
