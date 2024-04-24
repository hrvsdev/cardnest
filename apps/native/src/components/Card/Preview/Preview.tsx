import { View } from "react-native";

import { AppText } from "@components/AppText";
import {
	CardBackground,
	cardPreviewStyles as styles,
	useCardNetworkLogo
} from "@components/Card/Preview/Shared.tsx";
import { Show } from "@components/Show";

import { useFormattedCardViewDetails } from "@libs/hooks/src/card/formatting.ts";

import { TH_WHITE } from "@styles/colors.ts";

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
					<AppText size="2xs" weight="light" letterSpacing={10 / 10}>
						CARDHOLDER
					</AppText>
					<AppText size="lg" letterSpacing={18 / 20} color={TH_WHITE}>
						{formattedCard.cardholder}
					</AppText>
				</View>
				<Show when={formattedCard.issuer}>
					<View>
						<AppText size="2xs" weight="light" letterSpacing={10 / 10} align="right">
							ISSUER
						</AppText>
						<AppText
							size="lg"
							letterSpacing={18 / 20}
							color={TH_WHITE}
							align="right"
							value={formattedCard.issuer}
						/>
					</View>
				</Show>
			</View>
			<View style={styles.cardMiddle}>
				{formattedCard.number.split("").map((char, index) => (
					<View key={index}>
						<AppText
							size="2xl"
							weight="bold"
							align="center"
							color={TH_WHITE}
							style={{ width: char.trim() ? 16 : 8 }}
							value={char}
						/>
					</View>
				))}
			</View>
			<View style={styles.cardBottom}>
				<View>
					<AppText size="2xs" weight="light" letterSpacing={10 / 10}>
						VALID THRU
					</AppText>
					<View style={styles.cardExpiryWrapper}>
						{formattedCard.expiry.split("").map((char, index) => (
							<View key={index}>
								<AppText
									lineHeight={28}
									weight="medium"
									align="center"
									color={TH_WHITE}
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
