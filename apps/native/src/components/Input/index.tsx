import { useState } from "react";
import {
	NativeSyntheticEvent,
	StyleSheet,
	TextInput,
	TextInputFocusEventData,
	TextInputProps,
	TextStyle
} from "react-native";

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
