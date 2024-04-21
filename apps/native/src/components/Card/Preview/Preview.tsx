import { View } from "react-native";

import { AppText } from "@components/AppText";
import {
	CardBackground,
	cardPreviewStyles as styles,
	useCardNetworkLogo
} from "@components/Card/Preview/Shared.tsx";
import { Show } from "@components/Show";

import { useFormattedCardViewDetails } from "@libs/hooks/src/card/formatting.ts";

import { themeColors } from "@styles/colors.ts";

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
					<AppText fontSize="2xs" fontWeight="300" letterSpacing={10 / 10}>
						CARDHOLDER
					</AppText>
					<AppText fontSize="lg" letterSpacing={18 / 20} color={themeColors.white.DEFAULT}>
						{formattedCard.cardholder}
					</AppText>
				</View>
				<Show when={formattedCard.issuer}>
					<View>
						<AppText fontSize="2xs" fontWeight="300" letterSpacing={10 / 10} textAlign="right">
							ISSUER
						</AppText>
						<AppText
							fontSize="lg"
							letterSpacing={18 / 20}
							color={themeColors.white.DEFAULT}
							textAlign="right"
							value={formattedCard.issuer}
						/>
					</View>
				</Show>
			</View>
			<View style={styles.cardMiddle}>
				{formattedCard.number.split("").map((char, index) => (
					<View key={index}>
						<AppText
							fontSize="2xl"
							fontWeight="700"
							textAlign="center"
							color={themeColors.white.DEFAULT}
							style={{ width: char.trim() ? 16 : 8 }}
							value={char}
						/>
					</View>
				))}
			</View>
			<View style={styles.cardBottom}>
				<View>
					<AppText fontSize="2xs" fontWeight="300" letterSpacing={10 / 10}>
						VALID THRU
					</AppText>
					<View style={styles.cardExpiryWrapper}>
						{formattedCard.expiry.split("").map((char, index) => (
							<View key={index}>
								<AppText
									lineHeight={28}
									fontWeight="500"
									textAlign="center"
									color={themeColors.white.DEFAULT}
									style={{ width: 10 }}
									value={char}
								/>
							</View>
						))}
					</View>
				</View>
				<View style={styles.cardNetworkLogoWrapper}>
					<CardNetwork />
				</View>
			</View>
		</CardBackground>
	);
}
