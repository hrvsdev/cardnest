import { useEffect, useRef } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import * as Haptic from "expo-haptics";
import { usePathname } from "expo-router";

import Animated, {
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from "react-native-reanimated";
import { IconCircleX, IconSearch } from "tabler-icons-react-native";

import { Show } from "@components/Show";

import { TH_WHITE, TH_WHITE_07, TH_WHITE_10, TH_WHITE_60 } from "@styles/colors.ts";

type SearchProps = {
	value: string;
	onChange: (value: string) => void;
};

export function HeaderSearch({ value, onChange }: SearchProps) {
	const path = usePathname();
	const inputRef = useRef<TextInput>(null);

	const showClearIcon = value.trim().length > 0;

	const focusProgress = useSharedValue(0);

	const focusedStyle = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(focusProgress.value, [0, 1], [TH_WHITE_07, TH_WHITE_10])
	}));

	const onClear = async () => {
		onChange("");
		await Haptic.selectionAsync();
	};

	const onFocus = () => (focusProgress.value = withTiming(1, { duration: 200 }));
	const onBlur = () => (focusProgress.value = withTiming(0, { duration: 200 }));

	useEffect(() => {
		inputRef.current?.blur();
	}, [path]);

	return (
		<View style={styles.wrapper}>
			<IconSearch size={24} color={TH_WHITE_60} style={{ position: "absolute", left: 28 }} />
			<Animated.View style={[{ borderRadius: 14, width: "100%" }, focusedStyle]}>
				<TextInput
					ref={inputRef}
					value={value}
					onChangeText={onChange}
					onFocus={onFocus}
					onBlur={onBlur}
					placeholderTextColor={TH_WHITE_60}
					style={[styles.input, showClearIcon ? styles.inputNotEmpty : styles.inputEmpty]}
					placeholder="Enter card number, bank or network"
				/>
			</Animated.View>
			<Show when={showClearIcon}>
				<Pressable onPress={onClear} style={{ position: "absolute", right: 28 }}>
					<IconCircleX size={24} color={TH_WHITE_60} />
				</Pressable>
			</Show>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		padding: 16,
		position: "relative",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 14
	},
	input: {
		width: "100%",
		color: TH_WHITE,
		fontSize: 16,
		paddingHorizontal: 48,
		height: 48,
		fontFamily: "Lato_400Regular"
	},
	inputEmpty: {
		paddingRight: 16
	},
	inputNotEmpty: {
		paddingRight: 48
	}
});
