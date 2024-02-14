import { useState } from "react";
import { StyleSheet, TextInput, TextInputProps, TextStyle } from "react-native";

type InputProps = TextInputProps & {
	focusedStyle?: TextStyle;
};

export function UnStyledInput({ style, focusedStyle, ...props }: InputProps) {
	const [isFocused, setIsFocused] = useState(false);

	return (
		<TextInput
			{...props}
			style={StyleSheet.compose(style, isFocused ? focusedStyle : {})}
			onFocus={() => setIsFocused(true)}
			onBlur={() => setIsFocused(false)}
		/>
	);
}
