import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import { AppText } from "@components/AppText";
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
				<AppText fontSize="xs" color={opacity(themeColors.white.DEFAULT, 0.6)} style={styles.title}>
					{title}
				</AppText>
			</Show>
			<View style={styles.list}>{children}</View>
			<Show when={description}>
				<AppText
					fontSize="sm"
					color={opacity(themeColors.white.DEFAULT, 0.6)}
					style={styles.description}
					value={description}
				/>
			</Show>
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		paddingLeft: 8,
		marginBottom: 8,
		textTransform: "uppercase"
	},
	description: {
		paddingLeft: 8,
		marginTop: 8
	},
	list: {
		gap: 2
	}
});
