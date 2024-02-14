import { ReactNode, useState } from "react";
import {
	NativeSyntheticEvent,
	StyleSheet,
	Text,
	TextInput,
	TextInputFocusEventData,
	TextInputProps,
	TextStyle,
	View
} from "react-native";

import { Show } from "@components/Show";

import { themeColors } from "@styles/colors.ts";

type UnStyledInputProps = TextInputProps & {
	focusedStyle?: TextStyle;
};

type InputProps = UnStyledInputProps & {
	label?: string;
	rightIcon?: ReactNode;
	error?: string;
};

export function UnStyledInput(props: UnStyledInputProps) {
	const [isFocused, setIsFocused] = useState(false);

	const onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
		setIsFocused(true);
		if (props.onFocus) props.onFocus(e);
	};

	const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
		setIsFocused(false);
		if (props.onBlur) props.onBlur(e);
	};

	return (
		<TextInput
			{...props}
			style={StyleSheet.compose(props.style, isFocused ? props.focusedStyle : {})}
			onFocus={onFocus}
			onBlur={onBlur}
		/>
	);
}

export function Input(props: InputProps) {
	const conditionalStyles = {
		color: props.error ? themeColors.red : themeColors.white.DEFAULT,
		paddingRight: props.rightIcon ? 48 : 16
	};

	return (
		<View style={{ flex: 1, rowGap: 8 }}>
			<Show when={props.label}>
				<View>
					<Text style={styles.label}>{props.label}</Text>
				</View>
			</Show>
			<View style={{ position: "relative" }}>
				<UnStyledInput
					{...props}
					focusedStyle={styles.focused}
					style={[styles.input, conditionalStyles]}
				/>
				<Show when={props.rightIcon}>
					<View style={styles.rightIconWrapper}>{props.rightIcon}</View>
				</Show>
			</View>
			<Show when={props.error}>
				<View>
					<Text style={styles.error}>{props.error}</Text>
				</View>
			</Show>
		</View>
	);
}

const styles = StyleSheet.create({
	input: {
		width: "100%",
		backgroundColor: themeColors.white["10"],
		borderRadius: 14,
		fontSize: 16,
		paddingLeft: 16,
		letterSpacing: 16 / 10,
		height: 48
	},
	focused: {
		backgroundColor: themeColors.white["15"]
	},
	label: {
		color: themeColors.white["80"],
		paddingLeft: 8,
		fontSize: 16
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
		width: 48,
	}
});
