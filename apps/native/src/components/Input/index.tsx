import { ReactNode } from "react";
import {
	NativeSyntheticEvent,
	StyleSheet,
	TextInput,
	TextInputFocusEventData,
	TextInputProps,
	View
} from "react-native";

import Animated, {
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from "react-native-reanimated";

import { AppText } from "@components/AppText";
import { Show } from "@components/Show";

import { themeColors } from "@styles/colors.ts";

type InputProps = TextInputProps & {
	label?: string;
	rightIcon?: ReactNode;
	error?: string;
};

export function Input(props: InputProps) {
	const focusProgress = useSharedValue(0);

	const focusedStyle = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(
			focusProgress.value,
			[0, 1],
			[themeColors.white["10"], themeColors.white["15"]]
		)
	}));

	const conditionalStyles = {
		color: props.error ? themeColors.red : themeColors.white.DEFAULT,
		letterSpacing: props.value ? 16 / 10 : undefined,
		paddingRight: props.rightIcon ? 48 : 16
	};

	const onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
		focusProgress.value = withTiming(1, { duration: 200 });
		if (props.onFocus) props.onFocus(e);
	};

	const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
		focusProgress.value = withTiming(0, { duration: 200 });
		if (props.onBlur) props.onBlur(e);
	};

	return (
		<View style={{ flex: 1, rowGap: 8 }}>
			<Show when={props.label}>
				<View>
					<AppText style={{ paddingLeft: 8 }}>{props.label}</AppText>
				</View>
			</Show>
			<Animated.View style={[styles.inputWrapper, focusedStyle]}>
				<TextInput
					{...props}
					onFocus={onFocus}
					onBlur={onBlur}
					placeholderTextColor={themeColors.white["60"]}
					style={[styles.input, conditionalStyles]}
				/>
				<Show when={props.rightIcon}>
					<View style={styles.rightIconWrapper}>{props.rightIcon}</View>
				</Show>
			</Animated.View>
			<Show when={props.error}>
				<View>
					<AppText fontSize="sm" color={themeColors.red} style={{ paddingLeft: 8 }}>
						{props.error}
					</AppText>
				</View>
			</Show>
		</View>
	);
}

const styles = StyleSheet.create({
	inputWrapper: {
		borderRadius: 14,
		position: "relative"
	},
	input: {
		width: "100%",
		fontSize: 16,
		paddingLeft: 16,
		height: 48
	},
	error: {
		color: themeColors.red,
		paddingLeft: 8,
		fontSize: 14
	},
	rightIconWrapper: {
		position: "absolute",
		right: 0,
		height: 48,
		width: 48
	}
});
