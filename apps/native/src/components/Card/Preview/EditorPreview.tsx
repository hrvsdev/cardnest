import { useCallback } from "react";
import { Text, View } from "react-native";

import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import {
	CardBackground,
	cardPreviewStyles as styles,
	useCardNetworkLogo
} from "@components/Card/Preview/Shared.tsx";

import { useFormattedCardViewDetails } from "@libs/hooks/src/card/formatting.ts";

import { CardField, CardFullProfile } from "@libs/types/src/card.ts";

type CardEditorPreviewProps = {
	card: CardFullProfile;
	focused?: CardField;
};

export function CardEditorPreview({ card, focused }: CardEditorPreviewProps) {
	const formattedCard = useFormattedCardViewDetails(card, { usePlaceholders: true });
	const CardNetwork = useCardNetworkLogo(card.network);

	const opacity = useSharedValue(1);

	const focusedStyles = useCallback(
		(field: CardField) => {
			return useAnimatedStyle(() => ({
				opacity: withTiming(focused === field ? 1 : 0.6, { duration: 200 })
			}));
		},
		[opacity, focused]
	);

	return (
		<CardBackground theme={card.theme}>

			<View style={styles.cardTop}>
				<Animated.View style={focusedStyles("cardholder")}>
					<Text style={styles.cardSubText}>Cardholder</Text>
					<Text style={styles.cardFieldText}>{formattedCard.cardholder}</Text>
				</Animated.View>
				<Animated.View style={focusedStyles("issuer")}>
					<Text style={[styles.cardSubText, { textAlign: "right" }]}>Issuer</Text>
					<Text style={styles.cardFieldText}>{formattedCard.issuer}</Text>
				</Animated.View>
			</View>

			<Animated.View style={[styles.cardMiddle, focusedStyles("number")]}>
				{formattedCard.number.split("").map((char, index) => (
					<View key={index}>
						<Text style={char.trim() ? styles.cardNumberText : styles.cardNumberSpace}>{char}</Text>
					</View>
				))}
			</Animated.View>

			<View style={styles.cardBottom}>
				<Animated.View style={focusedStyles("expiry")}>
					<Text style={styles.cardSubText}>Valid Thru</Text>
					<Text style={styles.cardExpiryWrapper}>
						{formattedCard.expiry.split("").map((char, index) => (
							<View key={index}>
								<Text style={styles.cardExpiryText}>{char}</Text>
							</View>
						))}
					</Text>
				</Animated.View>
				<View style={styles.cardNetworkLogoWrapper}>
					<CardNetwork />
				</View>
			</View>
		</CardBackground>
	);
}
