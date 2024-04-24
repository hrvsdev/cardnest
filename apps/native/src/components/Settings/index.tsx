import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import { AppText } from "@components/AppText";
import { Show } from "@components/Show";

import { TH_WHITE_60 } from "@styles/colors.ts";

type SettingsGroupProp = {
	title?: string;
	description?: string;
	children: ReactNode;
};

export function SettingsGroup({ title, description, children }: SettingsGroupProp) {
	return (
		<View>
			<Show when={title}>
				<AppText size="xs" color={TH_WHITE_60} style={styles.title}>
					{title}
				</AppText>
			</Show>
			<View style={styles.list}>{children}</View>
			<Show when={description}>
				<AppText size="sm" color={TH_WHITE_60} style={styles.description} value={description} />
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
