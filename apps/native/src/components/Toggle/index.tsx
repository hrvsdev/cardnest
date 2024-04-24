import { useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import * as Haptic from "expo-haptics";

import Animated, {
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from "react-native-reanimated";

import { TH_SKY, TH_WHITE, TH_WHITE_10 } from "@styles/colors.ts";

const uncheckedBgColor = TH_WHITE_10;
const checkedBgColor = TH_SKY;

type Props = {
	checked: boolean;
	onChange: (checked: boolean) => void;
};

export function Toggle({ checked, onChange }: Props) {
	const bgProgress = useSharedValue(checked ? 1 : 0);
	const left = useSharedValue(checked ? 22 : 2);

	const onPress = () => {
		Haptic.selectionAsync().then();
		onChange(!checked);
	};

	const wrapperBgStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: interpolateColor(
				bgProgress.value,
				[0, 1],
				[uncheckedBgColor, checkedBgColor]
			)
		};
	});

	useEffect(() => {
		bgProgress.value = withTiming(checked ? 1 : 0, { duration: 200 });
		left.value = withTiming(checked ? 22 : 2, { duration: 200 });
	}, [checked]);

	return (
		<Pressable onPress={onPress}>
			<Animated.View style={[styles.wrapper, wrapperBgStyle]}>
				<Animated.View style={[styles.thumb, { left }]} />
			</Animated.View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		position: "relative",
		width: 48,
		height: 28,
		borderRadius: 14,
		justifyContent: "center"
	},
	thumb: {
		position: "absolute",
		width: 24,
		height: 24,
		borderRadius: 12,
		backgroundColor: TH_WHITE
	}
});
