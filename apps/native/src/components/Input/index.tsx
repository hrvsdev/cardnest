import { useState } from "react";
import {
	NativeSyntheticEvent,
	StyleSheet,
	TextInput,
	TextInputFocusEventData,
	TextInputProps,
	TextStyle
} from "react-native";

import { themeColors } from "@styles/colors.ts";

type InputProps = TextInputProps & {
	focusedStyle?: TextStyle;
};

export function UnStyledInput(props: InputProps) {
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
	return <UnStyledInput {...props} style={styles.input} focusedStyle={styles.focused} />;
}

const styles = StyleSheet.create({
	input: {
		width: "100%",
		backgroundColor: themeColors.white["10"],
		borderRadius: 14,
		color: themeColors.white.DEFAULT,
		fontSize: 16,
		paddingHorizontal: 48,
		height: 48
	},
	focused: {
		backgroundColor: themeColors.white["15"]
	}
});
