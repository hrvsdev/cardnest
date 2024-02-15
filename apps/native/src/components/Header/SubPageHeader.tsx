import { Pressable, StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import { router } from "expo-router";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconChevronLeft, TablerIcon } from "tabler-icons-react-native";

import { Show } from "@components/Show";

import { themeColors } from "@styles/colors.ts";

type Props = {
	title: string;

	leftIconLabel?: string;

	rightButtonLabel?: string;
	rightButtonIcon?: TablerIcon;
	onRightButtonPress?: () => void;
};

export function SubPageHeader(props: Props) {
	const insets = useSafeAreaInsets();

	const onBackPress = () => router.back();

	const RightIcon = props.rightButtonIcon ?? (() => null);

	return (
		// @ts-ignore
		<BlurView style={{ paddingTop: insets.top }} intensity={0}>
			<View style={styles.wrapper}>
				<Pressable style={[styles.sideButtonWrapper, { left: 0 }]} onPress={onBackPress}>
					<IconChevronLeft strokeWidth={2.5} size={20} color={themeColors.sky} />
					<Text style={styles.sideButtonLabel}>{props.leftIconLabel ?? "Back"}</Text>
				</Pressable>

				<Text style={styles.title}>{props.title}</Text>

				<Pressable
					style={[styles.sideButtonWrapper, { right: 0 }]}
					onPress={props.onRightButtonPress}
				>
					<RightIcon size={20} color={themeColors.sky} />
					<Show when={props.rightButtonLabel}>
						<Text style={styles.sideButtonLabel}>{props.rightButtonLabel}</Text>
					</Show>
				</Pressable>
			</View>
		</BlurView>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		height: 48,
		position: "relative"
	},
	title: {
		fontSize: 16,
		fontWeight: "500",
		color: themeColors.white.DEFAULT
	},
	sideButtonWrapper: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		height: "100%",
		position: "absolute",
		paddingLeft: 16,
		paddingRight: 20,
		columnGap: 4
	},
	sideButtonLabel: {
		fontSize: 16,
		color: themeColors.sky
	}
});