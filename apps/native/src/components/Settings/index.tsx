import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Show } from "@components/Show";

import { opacity, themeColors } from "@styles/colors.ts";

type SettingsGroupProp = {
	title?: string;
	description?: string;
	children: ReactNode;
};

export function SettingsGroup({ title, description, children }: SettingsGroupProp) {
	return (
		<View>
			<Show when={title}>
				<Text style={styles.title}>{title}</Text>
			</Show>
			<View style={styles.list}>{children}</View>
			<Show when={description}>
				<Text style={styles.description}>{description}</Text>
			</Show>
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		paddingLeft: 8,
		marginBottom: 8,
		color: opacity(themeColors.white.DEFAULT, 0.6),
		fontSize: 12,
		textTransform: "uppercase"
	},
	description: {
		paddingLeft: 8,
		marginTop: 8,
		color: opacity(themeColors.white.DEFAULT, 0.6),
		fontSize: 14
	},
	list: {
		gap: 2
	}
});
