import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

import { PlusCircleIcon } from "react-native-heroicons/outline";

import { AppText } from "@components/AppText";
import { Button } from "@components/Button";
import { PageContainer, TabPageRoot } from "@components/Containers";
import { HeaderTitle } from "@components/Header/HeaderTitle.tsx";

import { TH_WHITE_70 } from "@styles/colors.ts";

export default function AddCardPage() {
	const router = useRouter();
	return (
		<TabPageRoot style={{ flexGrow: 1 }}>
			<HeaderTitle title="Add Card" />
			<PageContainer style={{ flexGrow: 1 }}>
				<View style={styles.container}>
					<PlusCircleIcon size={112} strokeWidth={1} color={TH_WHITE_70} />
					<View>
						<AppText textAlign="center">Add a new card to add to your collection.</AppText>
						<AppText textAlign="center">
							You can't scan cards yet but you can add them manually.
						</AppText>
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
	}
});
