import { ReactNode } from "react";
import { ColorValue, Text, TextStyle } from "react-native";

import { opacity, themeColors } from "@styles/colors.ts";

type DefaultSizeVariant = "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
type CustomSizeVariant = "2xs" | "md" | "heading";

type SizeVariant = DefaultSizeVariant | CustomSizeVariant;

type AppTextProps = {
	fontSize?: SizeVariant;
	lineHeight?: number;
	color?: ColorValue;
	fontWeight?: TextStyle["fontWeight"];
	letterSpacing?: number;
	textAlign?: TextStyle["textAlign"];

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

export function AppText(props: AppTextProps) {
	const style: TextStyle = {
		fontSize: sizeVariants[props.fontSize ?? "base"].fontSize,
		lineHeight: props.lineHeight ?? sizeVariants[props.fontSize ?? "base"].lineHeight,

		color: props.color ?? opacity(themeColors.white.DEFAULT, 0.8),
		fontWeight: props.fontWeight ?? "400",
		letterSpacing: props.letterSpacing,
		textAlign: props.textAlign
	};

	return <Text style={[props.style, style]}>{props.children ?? props.value ?? ""}</Text>;
}
