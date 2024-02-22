import { Text, View } from "react-native";

import {
	CardBackground,
	cardPreviewStyles as styles,
	useCardNetworkLogo
} from "@components/Card/Preview/Shared.tsx";

import { useFormattedCardViewDetails } from "@libs/hooks/src/card/formatting.ts";

import { CardFullProfile } from "@libs/types/src/card";

type CardPreviewProps = {
	card: CardFullProfile;
	maskCardNumber?: boolean;
};

export function CardPreview({ card, maskCardNumber }: CardPreviewProps) {
	const formattedCard = useFormattedCardViewDetails(card, { maskCardNumber });
	const CardNetwork = useCardNetworkLogo(card.network);

	return (
		<CardBackground theme={card.theme}>
			<View style={styles.cardTop}>
				<View>
					<Text style={styles.cardSubText}>Cardholder</Text>
					<Text style={styles.cardFieldText}>{formattedCard.cardholder}</Text>
				</View>
				<View>
					<Text style={[styles.cardSubText, { textAlign: "right" }]}>Issuer</Text>
					<Text style={styles.cardFieldText}>{formattedCard.issuer}</Text>
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
		</CardBackground>
	);
}
