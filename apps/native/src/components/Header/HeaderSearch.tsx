import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { IconCircleX, IconSearch } from "tabler-icons-react-native";

import { Show } from "@libs/components/src/Show";

import { themeColors } from "@styles/colors.ts";

type SearchProps = {
	value: string;
	onChange: (value: string) => void;
};

export function HeaderSearch({ value, onChange }: SearchProps) {
	const showClearIcon = value.trim().length > 0;

	const onClear = () => {
		onChange("");
	};

	return (
		<View style={styles.inputWrapper}>
			<IconSearch
				size={24}
				color={themeColors.white["60"]}
				style={{ position: "absolute", left: 28 }}
			/>
			<TextInput
				style={[styles.input, showClearIcon ? styles.inputNotEmpty : styles.inputEmpty]}
				value={value}
				onChangeText={onChange}
				placeholderTextColor={themeColors.white["60"]}
				placeholder="Enter card number, bank or network"
			/>
			<Show when={showClearIcon}>
				<Pressable onPress={onClear} style={{ position: "absolute", right: 28 }}>
					<IconCircleX size={24} color={themeColors.white["60"]} />
				</Pressable>
			</Show>
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
		width: "100%",
		backgroundColor: themeColors.white["10"],
		borderRadius: 14,
		color: themeColors.white.DEFAULT,
		fontSize: 16,
		paddingHorizontal: 48,
		height: 48
	},
	inputEmpty: {
		paddingRight: 16
	},
	inputNotEmpty: {
		paddingRight: 48
	}
});
