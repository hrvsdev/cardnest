import { PropsWithChildren, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

import { HeaderSearch } from "@components/Header/HeaderSearch.tsx";
import { HeaderTitle } from "@components/Header/HeaderTitle.tsx";
import { MasterCard } from "@components/Logos/MasterCard.tsx";

import { colors, themeColors } from "@styles/colors.ts";

export default function App() {
	const [search, setSearch] = useState("");

	const cardGradientColors = [colors.fuchsia["500"], colors.fuchsia["700"]];
	const start = { x: 0, y: 0 };
	const end = { x: 1, y: 1 };

	const props = { colors: cardGradientColors, start, end };

	const cardNumber = "8383 7373 9292 9283";
	const cardExpiry = "12/29";

	return (
		<AppContainer>
			<HeaderTitle title="Home" />
			<HeaderSearch value={search} onChange={setSearch} />
			<View style={styles.pageWrapper}>
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
						{cardNumber.split("").map((char, index) => (
							<View key={index}>
								<Text style={char.trim() ? styles.cardNumberText : styles.cardNumberSpace}>
									{char}
								</Text>
							</View>
						))}
					</View>
					<View style={styles.cardBottom}>
						<View>
							<Text style={styles.cardSubText}>Valid Thru</Text>
							<Text style={styles.cardExpiryWrapper}>
								{cardExpiry.split("").map((char, index) => (
									<View key={index}>
										<Text style={styles.cardExpiryText}>{char}</Text>
									</View>
								))}
							</Text>
						</View>
						<View style={styles.cardNetworkLogoWrapper}>
							<MasterCard />
						</View>
					</View>
				</LinearGradient>
			</View>
		</AppContainer>
	);
}

const styles = StyleSheet.create({
	pageWrapper: {
		flex: 1,
		flexDirection: "column",
		rowGap: 16,
		padding: 16
	},
	cardWrapper: {
		aspectRatio: 1.586,
		borderRadius: 16,
		padding: 20,
		paddingBottom: 12,
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
		paddingBottom: 8
	}
});

function AppContainer({ children }: PropsWithChildren) {
	const gradientColors = [themeColors.black, themeColors.darkerBlue];

	const start = { x: 1, y: 0 };
	const end = { x: 0, y: 1 };

	return (
		<LinearGradient style={{ flex: 1 }} colors={gradientColors} start={start} end={end}>
			<View style={{ flex: 1, paddingTop: 20 }}>{children}</View>
			<StatusBar style="light" />
		</LinearGradient>
	);
}
