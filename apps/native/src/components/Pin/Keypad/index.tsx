import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { BackspaceIcon } from "react-native-heroicons/outline";
import Animated, {
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from "react-native-reanimated";

import { PIN_LENGTH } from "@libs/utils/src/auth.ts";

import { opacity, themeColors } from "@styles/colors.ts";

const SPLITTED_KEYPAD_NUMBERS = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9]
];

type Props = {
	pin: number[];
	setPin: (value: number[]) => void;
	onPinChange: (pinValue: string) => void;
};

export function Keypad({ pin, setPin, onPinChange: onPinChangeEffect }: Props) {
	const isDisabled = pin.length === PIN_LENGTH;

	const onPinChange = (num: number) => {
		if (pin.length === PIN_LENGTH) return;

		const newPin = [...pin, num];

		setPin(newPin);
		onPinChangeEffect(newPin.join(""));
	};

	const backspace = () => {
		if (pin.length > 0) {
			setPin(pin.slice(0, -1));
		}
	};

	return (
		<View style={styles.container}>
			<View>
				{SPLITTED_KEYPAD_NUMBERS.map((row, index) => (
					<View key={index} style={styles.row}>
						{row.map((n) => (
							<KeypadButton
								key={n}
								label={n}
								onPress={() => onPinChange(n)}
								disabled={isDisabled}
							/>
						))}
					</View>
				))}
				<View style={{ flexDirection: "row" }}>
					<View style={{ width: 72 + 20, height: 72 + 20 }} />
					<KeypadButton label={0} onPress={() => onPinChange(0)} disabled={isDisabled} />
					<KeypadButton
						onPress={backspace}
						disabled={isDisabled}
						label={<BackspaceIcon size={32} color={themeColors.white.DEFAULT} />}
					/>
				</View>
			</View>
		</View>
	);
}

type KeypadButtonProps = {
	label: ReactNode;
	onPress: () => void;
	disabled?: boolean;
};

const INIT_BG = opacity(themeColors.white.DEFAULT, 0.05);
const PRESSED_BG = opacity(themeColors.white.DEFAULT, 0.5);

function KeypadButton({ label, onPress, disabled }: KeypadButtonProps) {
	const scale = useSharedValue(1);
	const bgProgress = useSharedValue(0);

	const onPressIn = () => {
		scale.value = withTiming(0.95, { duration: 50 });
		bgProgress.value = withTiming(1, { duration: 50 });
	};

	const onPressOut = () => {
		scale.value = withTiming(1, { duration: 50 });
		bgProgress.value = withTiming(0, { duration: 200 });
	};

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: scale.value }],
			backgroundColor: interpolateColor(bgProgress.value, [0, 1], [INIT_BG, PRESSED_BG])
		};
	});

	return (
		<View style={{ padding: 10 }}>
			<Pressable
				disabled={disabled}
				onPress={onPress}
				onPressIn={onPressIn}
				onPressOut={onPressOut}
			>
				<Animated.View style={[styles.keypadButton, animatedStyle, disabled && { opacity: 0.5 }]}>
					{typeof label === "number" ? <Text style={styles.keypadButtonText}>{label}</Text> : label}
				</Animated.View>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	row: {
		flexDirection: "row"
	},
	keypadButton: {
		justifyContent: "center",
		alignItems: "center",
		width: 72,
		height: 72,
		borderRadius: 36,
		borderWidth: 1,
		borderColor: themeColors.white[20],
		backgroundColor: themeColors.white[5]
	},
	keypadButtonText: {
		fontSize: 30,
		color: themeColors.white.DEFAULT
	}
});
