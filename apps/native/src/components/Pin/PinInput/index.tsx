import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Haptics from "expo-haptics";

import Animated, {
	useSharedValue,
	withRepeat,
	withSequence,
	withSpring,
	withTiming
} from "react-native-reanimated";

import { themeColors } from "@styles/colors.ts";

type Props = {
	pin: number[];
	isPinIncorrect: boolean;
	isLoading?: boolean;
};

type DotProps = {
	isFilled: boolean;
	hasError: boolean;
	isAnimationActive: boolean;
};

const PIN_LENGTH_ARR = [1, 2, 3, 4, 5, 6];

export function PinInput({ isPinIncorrect, pin, isLoading }: Props) {
	const [activeAnimation, setActiveAnimation] = useState(0);

	const x = useSharedValue(0);

	useEffect(() => {
		if (!isLoading) {
			setActiveAnimation(0);
			return;
		}

		const intervalId = setInterval(() => {
			setActiveAnimation((prev) => (prev % PIN_LENGTH_ARR.length) + 1);
		}, 100);

		return () => clearInterval(intervalId);
	}, [isLoading]);

	useEffect(() => {
		const OFFSET = 8;
		const DURATION = 100;

		if (isPinIncorrect) {
			Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).then();
			x.value = withSequence(
				withTiming(-OFFSET, { duration: DURATION / 2 }),
				withRepeat(withTiming(OFFSET, { duration: DURATION }), 6, true),
				withTiming(0, { duration: DURATION / 2 })
			);
		}
	}, [isPinIncorrect]);

	return (
		<View>
			<Animated.View style={[styles.container, { transform: [{ translateX: x }] }]}>
				{PIN_LENGTH_ARR.map((n) => (
					<Dot
						key={n}
						isAnimationActive={activeAnimation === n}
						hasError={isPinIncorrect}
						isFilled={pin.length >= n}
					/>
				))}
			</Animated.View>
		</View>
	);
}

function Dot({ isFilled, hasError, isAnimationActive }: DotProps) {
	const scale = useSharedValue(1);

	const getStyle = () => {
		let backgroundColor = "transparent";
		let borderColor = themeColors.white.DEFAULT;

		if (hasError) {
			backgroundColor = themeColors.red;
			borderColor = themeColors.red;
		} else if (isFilled) {
			backgroundColor = themeColors.white.DEFAULT;
		}

		return { backgroundColor, borderColor, transform: [{ scale }] };
	};

	useEffect(() => {
		scale.value = withSpring(isAnimationActive ? 1.5 : 1);
	}, [isAnimationActive]);

	return <Animated.View style={[styles.dot, getStyle()]} />;
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 12
	},
	dot: {
		width: 12,
		height: 12,
		borderWidth: 1,
		borderRadius: 6
	}
});
