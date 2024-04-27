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

import { TH_RED, TH_WHITE, TH_WHITE_07, TH_WHITE_10, TH_WHITE_60 } from "@styles/colors.ts";

type InputProps = TextInputProps & {
	label?: string;
	rightIcon?: ReactNode;
	error?: string;
};

export function Input(props: InputProps) {
	const focusProgress = useSharedValue(0);

	const focusedStyle = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(focusProgress.value, [0, 1], [TH_WHITE_07, TH_WHITE_10])
	}));

	const conditionalStyles = {
		color: props.error ? TH_RED : TH_WHITE,
		letterSpacing: 16 / 10,
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
					placeholderTextColor={TH_WHITE_60}
					style={[styles.input, conditionalStyles]}
				/>
				<Show when={props.rightIcon}>
					<View style={styles.rightIconWrapper}>{props.rightIcon}</View>
				</Show>
			</Animated.View>
			<Show when={props.error}>
				<View>
					<AppText size="sm" color={TH_RED} style={{ paddingLeft: 8 }}>
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
		height: 48,
		fontFamily: "Lato_400Regular"
	},
	error: {
		color: TH_RED,
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
