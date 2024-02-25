import { ReactElement } from "react";
import { StyleSheet, Text, View } from "react-native";

import { TablerIconsProps } from "tabler-icons-react-native";

import { Toggle } from "@components/Toggle";

import { opacity, themeColors } from "@styles/colors.ts";

type Props = {
	Icon: (props: TablerIconsProps) => ReactElement;
	title: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
	isFirst?: boolean;
	isLast?: boolean;
};

export function SettingsToggleButton(props: Props) {
	// @ts-ignore
	const { Icon, title, checked, onChange, isFirst, isLast } = props;

	const borderRadiusStyle = {
		borderTopLeftRadius: isFirst ? 12 : 2,
		borderTopRightRadius: isFirst ? 12 : 2,
		borderBottomLeftRadius: isLast ? 12 : 2,
		borderBottomRightRadius: isLast ? 12 : 2
	};

	const style = StyleSheet.compose(styles.container, borderRadiusStyle);

	return (
		<View style={style}>
			<View style={styles.contentContainer}>
				<View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
					<Icon size={20} color={themeColors.white.DEFAULT} />
					<Text style={{ fontSize: 16, color: themeColors.white.DEFAULT }}>{title}</Text>
				</View>
				<View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
					<Toggle checked={checked} onChange={onChange} />
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: opacity(themeColors.white.DEFAULT, 0.075)
	},
	contentContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		height: 44,
		paddingHorizontal: 12
	}
});
