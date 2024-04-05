import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

import { PlusCircleIcon } from "react-native-heroicons/outline";

import { Button } from "@components/Button";
import { PageContainer, TabPageRoot } from "@components/Containers";
import { HeaderTitle } from "@components/Header/HeaderTitle.tsx";

import { colors, opacity, themeColors } from "@styles/colors.ts";

export default function AddCardPage() {
	const router = useRouter();
	return (
		<TabPageRoot style={{ flexGrow: 1, paddingBottom: 56 }}>
			<HeaderTitle title="Add Card" />
			<PageContainer style={{ flexGrow: 1 }}>
				<View style={styles.container}>
					<PlusCircleIcon size={112} strokeWidth={1} color={colors.gray["400"]} />
					<View>
						<Text style={styles.text}>Add a new card to add to your collection.</Text>
						<Text style={styles.text}>You can't scan cards yet but you can add them manually.</Text>
					</View>
				</View>
				<Button title="Add Card" onPress={() => router.navigate("/add/editor")} />
			</PageContainer>
		</TabPageRoot>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		justifyContent: "center",
		alignItems: "center",
		gap: 16
	},
	text: {
		textAlign: "center",
		fontSize: 16,
		color: opacity(themeColors.white.DEFAULT, 0.7),
		lineHeight: 16 * 1.5
	}
});
