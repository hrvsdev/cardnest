import { Pressable, StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import { router } from "expo-router";

import Animated, {
	Extrapolation,
	interpolate,
	interpolateColor,
	SharedValue,
	useAnimatedProps,
	useAnimatedStyle
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconChevronLeft, TablerIcon } from "tabler-icons-react-native";

import { Show } from "@components/Show";

import { opacity, themeColors } from "@styles/colors.ts";

type Props = {
	title: string;

	leftIconLabel?: string;

	rightButtonLabel?: string;
	rightButtonIcon?: TablerIcon;
	onRightButtonPress?: () => void;

	scrollOffset: SharedValue<number>;
};

const HEADER_TOP_OFFSET = 0;
const HEADER_BOTTOM_OFFSET = 16;

const BACKGROUND_INITIAL_COLOR = opacity(themeColors.black, 0);
const BACKGROUND_FINAL_COLOR = opacity(themeColors.black, 0.8);

const BORDER_INITIAL_COLOR = opacity(themeColors.white.DEFAULT, 0);
const BORDER_FINAL_COLOR = opacity(themeColors.white.DEFAULT, 0.1);

const inputRange = [HEADER_TOP_OFFSET, HEADER_BOTTOM_OFFSET];
const backgroundRange = [BACKGROUND_INITIAL_COLOR, BACKGROUND_FINAL_COLOR];
const borderRange = [BORDER_INITIAL_COLOR, BORDER_FINAL_COLOR];

// @ts-ignore
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export function SubPageHeader(props: Props) {
	const insets = useSafeAreaInsets();

	const onBackPress = () => router.back();

	const RightIcon = props.rightButtonIcon ?? (() => null);

	const blurProps = useAnimatedProps(() => {
		return {
			intensity: interpolate(props.scrollOffset.value, inputRange, [0, 50], Extrapolation.CLAMP)
		};
	});

	const animatedStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: interpolateColor(props.scrollOffset.value, inputRange, backgroundRange),
			borderColor: interpolateColor(props.scrollOffset.value, inputRange, borderRange)
		};
	});

	return (
		// @ts-ignore
		<AnimatedBlurView animatedProps={blurProps}>
			<Animated.View style={[{ paddingTop: insets.top, borderBottomWidth: 1 }, animatedStyle]}>
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
			</Animated.View>
		</AnimatedBlurView>
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
