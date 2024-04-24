import { ReactNode } from "react";
import { ColorValue, Text, TextStyle } from "react-native";

import { TH_WHITE_80 } from "@styles/colors.ts";

type FontWeight = "light" | "normal" | "medium" | "bold";
type Align = "left" | "center" | "right";

type DefaultSizeVariant = "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
type CustomSizeVariant = "2xs" | "md" | "heading";

type FontFamily = "lato" | "manrope";

type SizeVariant = DefaultSizeVariant | CustomSizeVariant;

type AppTextProps = {
	size?: SizeVariant;
	lineHeight?: number;
	color?: ColorValue;
	weight?: FontWeight;
	align?: Align;
	letterSpacing?: number;

	manrope?: boolean;

	value?: string;
	children?: ReactNode;
	style?: TextStyle;
};

const sizeVariants: Record<SizeVariant, { fontSize: number; lineHeight: number }> = {
	"2xs": { fontSize: 10, lineHeight: 12 },
	xs: { fontSize: 12, lineHeight: 16 },
	sm: { fontSize: 14, lineHeight: 20 },
	base: { fontSize: 16, lineHeight: 24 },
	md: { fontSize: 17, lineHeight: 26 },
	lg: { fontSize: 18, lineHeight: 28 },
	xl: { fontSize: 20, lineHeight: 28 },
	"2xl": { fontSize: 24, lineHeight: 32 },
	"3xl": { fontSize: 30, lineHeight: 36 },
	heading: { fontSize: 28, lineHeight: 34 }
};

const fontWeightFamily: Record<FontFamily, Record<FontWeight, string>> = {
	manrope: {
		light: "Manrope_300Light",
		normal: "Manrope_400Regular",
		medium: "Manrope_500Medium",
		bold: "Manrope_700Bold"
	},
	lato: {
		light: "Lato_300Light",
		normal: "Lato_400Regular",
		medium: "Lato_700Bold",
		bold: "Lato_700Bold"
	}
};

export function AppText(props: AppTextProps) {
	const style: TextStyle = {
		fontSize: sizeVariants[props.size ?? "base"].fontSize,
		lineHeight: props.lineHeight ?? sizeVariants[props.size ?? "base"].lineHeight,

		color: props.color ?? TH_WHITE_80,
		letterSpacing: props.letterSpacing,
		textAlign: props.align,

		fontFamily: fontWeightFamily[props.manrope ? "manrope" : "lato"][props.weight ?? "normal"]
	};

	return <Text style={[props.style, style]}>{props.children ?? props.value ?? ""}</Text>;
}
