import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Amex } from "@components/Logos/Amex.tsx";
import { Diners } from "@components/Logos/Diners.tsx";
import { Discover } from "@components/Logos/Discover.tsx";
import { MasterCard } from "@components/Logos/MasterCard.tsx";
import { Rupay } from "@components/Logos/Rupay.tsx";
import { Visa } from "@components/Logos/Visa.tsx";

import { useFormattedCardViewDetails } from "@libs/hooks/src/card/formatting.ts";

import { colors, themeColors } from "@styles/colors.ts";

import { CardField, CardFullProfile } from "@libs/types/src/card";

type Props = {
	card: CardFullProfile;
	usePlaceholders?: boolean;
	focused?: CardField;
	maskCardNumber?: boolean;
};

export function CardPreview({ card, usePlaceholders, maskCardNumber }: Props) {
	const formattedCard = useFormattedCardViewDetails(card, { usePlaceholders, maskCardNumber });
	const CardNetwork = useCardNetworkLogo(card.network);

	const cardGradientColors = [colors[card.theme]["500"], colors[card.theme]["700"]];
	const start = { x: 0, y: 0 };
	const end = { x: 1, y: 1 };

	const props = { colors: cardGradientColors, start, end };

	return (
		<LinearGradient style={styles.cardWrapper} {...props}>
			<View style={styles.cardTop}>
				<View>
					<Text style={styles.cardSubText}>Cardholder</Text>
					<Text style={styles.cardFieldText}>Harsh Vyas</Text>
				</View>
				<View>
					<Text style={[styles.cardSubText, { textAlign: "right" }]}>Issuer</Text>
					<Text style={styles.cardFieldText}>HDFC Bank</Text>
				</View>
			</View>
			<View style={styles.cardMiddle}>
				{formattedCard.number.split("").map((char, index) => (
					<View key={index}>
						<Text style={char.trim() ? styles.cardNumberText : styles.cardNumberSpace}>{char}</Text>
					</View>
				))}
			</View>
			<View style={styles.cardBottom}>
				<View>
					<Text style={styles.cardSubText}>Valid Thru</Text>
					<Text style={styles.cardExpiryWrapper}>
						{formattedCard.expiry.split("").map((char, index) => (
							<View key={index}>
								<Text style={styles.cardExpiryText}>{char}</Text>
							</View>
						))}
					</Text>
				</View>
				<View style={styles.cardNetworkLogoWrapper}>
					<CardNetwork />
				</View>
			</View>
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

const styles = StyleSheet.create({
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
