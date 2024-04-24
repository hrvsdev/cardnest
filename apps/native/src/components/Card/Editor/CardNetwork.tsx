import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import * as Haptics from "expo-haptics";

import { AppText } from "@components/AppText";
import { Amex } from "@components/Logos/Amex.tsx";
import { Diners } from "@components/Logos/Diners.tsx";
import { Discover } from "@components/Logos/Discover.tsx";
import { MasterCard } from "@components/Logos/MasterCard.tsx";
import { Other } from "@components/Logos/Other.tsx";
import { Rupay } from "@components/Logos/Rupay.tsx";
import { Visa } from "@components/Logos/Visa.tsx";

import { TH_SKY, TH_WHITE_10 } from "@styles/colors.ts";

import { PaymentNetwork } from "@libs/types/src/card";

type Props = {
	selected: PaymentNetwork;
	setSelected: (value: PaymentNetwork) => void;
};

const networks = [
	{ network: "visa", logo: Visa, width: 48 },
	{ network: "mastercard", logo: MasterCard, width: 36 },
	{ network: "rupay", logo: Rupay, width: 72 },
	{ network: "discover", logo: Discover, width: 80 },
	{ network: "diners", logo: Diners, width: 28 },
	{ network: "amex", logo: Amex, width: 64 },
	{ network: "other", logo: Other, width: 30 }
] as const;

export function CardNetworkSelect({ selected, setSelected }: Props) {
	const onPress = async (network: PaymentNetwork) => {
		setSelected(network);
		await Haptics.selectionAsync();
	};

	return (
		<View style={{ flex: 1, rowGap: 8 }}>
			<AppText style={{ paddingLeft: 8 }}>Card network</AppText>

			<View style={styles.grid}>
				{networks.map((N) => (
					<Pressable
						key={N.network}
						onPress={() => onPress(N.network)}
						style={[styles.item, selected === N.network ? styles.selected : styles.notSelected]}
					>
						<N.logo width={N.width} />
					</Pressable>
				))}
			</View>
		</View>
	);
}

const PAGE_PADDING = 16;
const ITEM_GAP = 8;
const NO_OF_ITEMS = 3;

const pageContentWidth = Dimensions.get("window").width - PAGE_PADDING * 2;
const gridItemWidth = (pageContentWidth - ITEM_GAP * (NO_OF_ITEMS - 1)) / NO_OF_ITEMS;

const styles = StyleSheet.create({
	grid: {
		flex: 1,
		flexWrap: "wrap",
		flexDirection: "row",
		gap: 8
	},
	item: {
		width: gridItemWidth,
		justifyContent: "center",
		alignItems: "center",
		height: 48,
		borderRadius: 10,
		backgroundColor: TH_WHITE_10,
		borderWidth: 1
	},
	selected: {
		borderColor: TH_SKY
	},
	notSelected: {
		borderColor: TH_WHITE_10
	}
});
