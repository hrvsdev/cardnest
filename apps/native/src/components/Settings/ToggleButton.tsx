import { ReactElement } from "react";
import { StyleSheet, View } from "react-native";

import { TablerIconsProps } from "tabler-icons-react-native";

import { AppText } from "@components/AppText";
import { Toggle } from "@components/Toggle";

import { opacity, TH_WHITE } from "@styles/colors.ts";

type Props = {
	Icon: (props: TablerIconsProps) => ReactElement;
	title: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
	isFirst?: boolean;
	isLast?: boolean;
};

export function SettingsToggleButton(props: Props) {
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
					<Icon size={20} color={TH_WHITE} />
					<AppText color={TH_WHITE}>{title}</AppText>
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
		backgroundColor: opacity(TH_WHITE, 0.075)
	},
	contentContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		height: 44,
		paddingHorizontal: 12
	}
});
