import { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";

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

const fields: CardField[] = ["cardholder", "issuer", "number", "expiry"];

export function CardEditorPreview({ card, focused }: CardEditorPreviewProps) {
	const formattedCard = useFormattedCardViewDetails(card, { usePlaceholders: true });
	const CardNetwork = useCardNetworkLogo(card.network);

	const cardholderOpacity = useRef(new Animated.Value(1)).current;
	const issuerOpacity = useRef(new Animated.Value(1)).current;
	const numberOpacity = useRef(new Animated.Value(1)).current;
	const expiryOpacity = useRef(new Animated.Value(1)).current;

	const animatedFocusedStyles = {
		cardholder: { opacity: cardholderOpacity },
		issuer: { opacity: issuerOpacity },
		number: { opacity: numberOpacity },
		expiry: { opacity: expiryOpacity }
	};

	const values = {
		cardholder: cardholderOpacity,
		issuer: issuerOpacity,
		number: numberOpacity,
		expiry: expiryOpacity
	};

	useEffect(() => {
		Animated.parallel(
			fields.map((field) =>
				Animated.timing(values[field], {
					toValue: field === focused ? 1 : 0.55,
					duration: 200,
					useNativeDriver: true
				})
			)
		).start();
	}, [focused]);

	return (
		<CardBackground theme={card.theme}>
			<View style={styles.cardTop}>
				<Animated.View style={animatedFocusedStyles.cardholder}>
					<Text style={styles.cardSubText}>Cardholder</Text>
					<Text style={styles.cardFieldText}>{formattedCard.cardholder}</Text>
				</Animated.View>
				<Animated.View style={animatedFocusedStyles.issuer}>
					<Text style={[styles.cardSubText, { textAlign: "right" }]}>Issuer</Text>
					<Text style={styles.cardFieldText}>{formattedCard.issuer}</Text>
				</Animated.View>
			</View>
			<Animated.View style={[styles.cardMiddle, animatedFocusedStyles.number]}>
				{formattedCard.number.split("").map((char, index) => (
					<View key={index}>
						<Text style={char.trim() ? styles.cardNumberText : styles.cardNumberSpace}>{char}</Text>
					</View>
				))}
			</Animated.View>
			<View style={styles.cardBottom}>
				<Animated.View style={animatedFocusedStyles.expiry}>
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
