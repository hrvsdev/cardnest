import { useRef } from "react";

import { Show } from "@cardnest/web/src/components/Show";
import { StyleSheet, TextInput, View } from "react-native";
import { IconCircleX, IconSearch } from "tabler-icons-react-native";

import { themeColors } from "../../styles/colors.ts";

type SearchProps = {
	value: string;
	onChange: (value: string) => void;
};

export function HeaderSearch({ value, onChange }: SearchProps) {
	const inputRef = useRef<TextInput>(null);
	const showClearIcon = value.trim().length > 0;

	const onClear = () => {
		onChange("");
		inputRef.current?.focus();
	};

	return (
		<View style={styles.inputWrapper}>
			<IconSearch
				size={24}
				color={themeColors.white["60"]}
				style={{ position: "absolute", left: 28 }}
			/>
			<Show when={showClearIcon}>
				<IconCircleX
					size={24}
					color={themeColors.white["60"]}
					style={{ position: "absolute", right: 28 }}
					onClick={onClear}
				/>
			</Show>
			<TextInput
				style={styles.input}
				ref={inputRef}
				value={value}
				onChangeText={onChange}
				placeholderTextColor={themeColors.white["60"]}
				placeholder="Enter card number, bank or network"
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	inputWrapper: {
		padding: 16,
		position: "relative",
		display: "flex",
		flexDirection: "row",
		alignItems: "center"
	},
	input: {
		backgroundColor: themeColors.white["10"],
		borderRadius: 14,
		color: themeColors.white.DEFAULT,
		fontSize: 16,
		paddingHorizontal: 48,
		height: 48
	}
});
