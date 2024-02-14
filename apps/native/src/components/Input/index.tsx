import { useState } from "react";
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
	return (
		<View>
			<Show when={props.label}>
				<View>
					<Text style={styles.label}>{props.label}</Text>
				</View>
			</Show>
			<UnStyledInput {...props} style={styles.input} focusedStyle={styles.focused} />
		</View>
	);
}

const styles = StyleSheet.create({
	label: {
		color: themeColors.white["80"],
		marginBottom: 8,
		paddingLeft: 8,
		fontSize: 16
	},
	input: {
		width: "100%",
		backgroundColor: themeColors.white["10"],
		borderRadius: 14,
		color: themeColors.white.DEFAULT,
		fontSize: 16,
		paddingHorizontal: 16,
		letterSpacing: 16 / 10,
		height: 48
	},
	focused: {
		backgroundColor: themeColors.white["15"]
	}
});
