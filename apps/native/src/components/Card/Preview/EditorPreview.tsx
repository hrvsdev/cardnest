import { useCallback } from "react";
import { View } from "react-native";

import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import { AppText } from "@components/AppText";
import {
	CardBackground,
	cardPreviewStyles as styles,
	useCardNetworkLogo
} from "@components/Card/Preview/Shared.tsx";

import { useFormattedCardViewDetails } from "@libs/hooks/src/card/formatting.ts";

import { TH_WHITE, TH_WHITE_70 } from "@styles/colors.ts";

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
					<AppText manrope size="2xs" weight="light" letterSpacing={10 / 10} color={TH_WHITE_70}>
						CARDHOLDER
					</AppText>
					<AppText manrope size="lg" weight="medium" letterSpacing={18 / 20} color={TH_WHITE}>
						{formattedCard.cardholder}
					</AppText>
				</Animated.View>
				<Animated.View style={focusedStyles("issuer")}>
					<AppText manrope size="2xs" letterSpacing={10 / 10} color={TH_WHITE_70} align="right">
						ISSUER
					</AppText>
					<AppText
						manrope
						size="lg"
						weight="medium"
						letterSpacing={18 / 20}
						color={TH_WHITE}
						align="right"
						value={formattedCard.issuer}
					/>
				</Animated.View>
			</View>

			<Animated.View style={[styles.cardMiddle, focusedStyles("number")]}>
				{formattedCard.number.split("").map((char, index) => (
					<View key={index}>
						<AppText
							manrope
							size="2xl"
							weight="bold"
							align="center"
							color={TH_WHITE}
							style={{ width: char.trim() ? 16 : 8 }}
							value={char}
						/>
					</View>
				))}
			</Animated.View>

			<View style={styles.cardBottom}>
				<Animated.View style={focusedStyles("expiry")}>
					<AppText manrope size="2xs" letterSpacing={10 / 10} color={TH_WHITE_70}>
						VALID THRU
					</AppText>
					<View style={styles.cardExpiryWrapper}>
						{formattedCard.expiry.split("").map((char, index) => (
							<View key={index}>
								<AppText
									manrope
									lineHeight={28}
									weight="bold"
									align="center"
									color={TH_WHITE}
									style={{ width: 10 }}
									value={char}
								/>
							</View>
						))}
					</View>
				</Animated.View>
				<View style={styles.cardNetworkLogoWrapper}>
					<CardNetwork />
				</View>
			</View>
		</CardBackground>
	);
}
