import { PropsWithChildren, useMemo } from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Amex } from "@components/Logos/Amex.tsx";
import { Diners } from "@components/Logos/Diners.tsx";
import { Discover } from "@components/Logos/Discover.tsx";
import { MasterCard } from "@components/Logos/MasterCard.tsx";
import { Rupay } from "@components/Logos/Rupay.tsx";
import { Visa } from "@components/Logos/Visa.tsx";

import { colors, themeColors } from "@styles/colors.ts";

import { CardTheme } from "@libs/types/src/card.ts";

export function CardBackground({ theme, children }: PropsWithChildren<{ theme: CardTheme }>) {
	const cardGradientColors = [colors[theme]["500"], colors[theme]["700"]];
	const start = { x: 0, y: 0 };
	const end = { x: 1, y: 1 };

	const props = { colors: cardGradientColors, start, end };

	return (
		<LinearGradient style={cardPreviewStyles.cardWrapper} {...props}>
			{children}
		</LinearGradient>
	);
}

export function useCardNetworkLogo(network: string) {
	return useMemo(() => {
		switch (network) {
			case "visa":
				return Visa;
			case "mastercard":
				return MasterCard;
			case "amex":
				return Amex;
			case "discover":
				return Discover;
			case "diners":
				return Diners;
			case "rupay":
				return Rupay;
			default:
				return () => null;
		}
	}, [network]);
}

export const cardPreviewStyles = StyleSheet.create({
	cardWrapper: {
		aspectRatio: 1.586,
		borderRadius: 16,
		padding: 20,
		paddingBottom: 14,
		display: "flex",
		justifyContent: "space-between"
	},
	cardTop: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between"
	},
	cardMiddle: {
		display: "flex",
		flexDirection: "row"
	},
	cardBottom: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-end"
	},
	cardSubText: {
		fontSize: 10,
		lineHeight: 12,
		fontWeight: "300",
		color: themeColors.white["80"],
		textTransform: "uppercase",
		letterSpacing: 10 / 10
	},
	cardFieldText: {
		fontSize: 18,
		lineHeight: 28,
		color: themeColors.white.DEFAULT,
		letterSpacing: 18 / 20
	},
	cardNumberText: {
		fontSize: 24,
		lineHeight: 32,
		fontWeight: "700",
		width: 16,
		textAlign: "center",
		color: themeColors.white.DEFAULT
	},
	cardNumberSpace: {
		width: 8
	},
	cardExpiryWrapper: {
		display: "flex",
		flexDirection: "row"
	},
	cardExpiryText: {
		fontSize: 16,
		lineHeight: 28,
		fontWeight: "500",
		color: themeColors.white.DEFAULT,
		textAlign: "center",
		width: 10
	},
	cardNetworkLogoWrapper: {
		paddingBottom: 6
	}
});
