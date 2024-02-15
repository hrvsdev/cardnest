import { Pressable, StyleSheet, Text, View } from "react-native";

import { Amex } from "@components/Logos/Amex.tsx";
import { Diners } from "@components/Logos/Diners.tsx";
import { Discover } from "@components/Logos/Discover.tsx";
import { MasterCard } from "@components/Logos/MasterCard.tsx";
import { Other } from "@components/Logos/Other.tsx";
import { Rupay } from "@components/Logos/Rupay.tsx";
import { Visa } from "@components/Logos/Visa.tsx";

import { themeColors } from "@styles/colors.ts";

import { PaymentNetwork } from "@libs/types/src/card";


type Props = {
	selected: PaymentNetwork;
	setSelected: (value: PaymentNetwork) => void;
};

const networks = [
	[
		{ network: "visa", logo: Visa, width: 48 },
		{ network: "mastercard", logo: MasterCard, width: 36 },
		{ network: "rupay", logo: Rupay, width: 72 }
	],
	[
		{ network: "discover", logo: Discover, width: 80 },
		{ network: "diners", logo: Diners, width: 28 },
		{ network: "amex", logo: Amex, width: 64 }
	],
	[{ network: "other", logo: Other, width: 30 }]
] as const;

export function CardNetworkSelect({ selected, setSelected }: Props) {
	return (
		<View style={{ flex: 1, rowGap: 8 }}>
			<Text style={styles.label}>Card network</Text>

			<View style={{ flex: 1, gap: 8 }}>
				{networks.map((row, i) => (
					<View key={i} style={styles.row}>
						{row.map((N) => (
							<Pressable
								key={N.network}
								onPress={() => setSelected(N.network)}
								style={[styles.item, selected === N.network ? styles.selected : styles.notSelected]}
							>
								<N.logo width={N.width} />
							</Pressable>
						))}
					</View>
				))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	label: {
		color: themeColors.white["80"],
		paddingLeft: 8,
		fontSize: 16
	},
	row: {
		flex: 1,
		flexDirection: "row",
		gap: 8
	},
	item: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		height: 48,
		borderRadius: 10,
		backgroundColor: themeColors.white["10"],
		borderWidth: 1
	},
	selected: {
		borderColor: themeColors.sky
	},
	notSelected: {
		borderColor: themeColors.white["10"]
	}
});
