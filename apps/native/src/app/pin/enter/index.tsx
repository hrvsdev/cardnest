import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BgGradient } from "@components/Gradient";
import { Keypad } from "@components/Pin/Keypad";
import { PinInput } from "@components/Pin/PinInput";

import { useVerifyAndSetPin } from "@libs/hooks/src/auth";

import { PIN_LENGTH } from "@libs/utils/src/auth.ts";

import { themeColors } from "@styles/colors.ts";

export default function EnterPinPage() {
	const insets = useSafeAreaInsets();
	const router = useRouter();

	const [pin, setPin] = useState<number[]>([]);
	const [isPinIncorrect, setIsPinIncorrect] = useState(false);

	const verifyAndSetPin = useVerifyAndSetPin();

	const invalidPinTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const checkPin = async (pinValue: string) => {
		if (pinValue.length !== PIN_LENGTH) return;

		const isPinCorrect = await verifyAndSetPin(pinValue);

		if (!isPinCorrect) {
			setIsPinIncorrect(true);
			invalidPinTimeoutRef.current = setTimeout(() => {
				setPin([]);
				setIsPinIncorrect(false);
			}, 1000);

			return;
		}

		redirectTimeoutRef.current = setTimeout(() => {
			router.replace("/home");
		}, 500);
	};

	useEffect(() => {
		return () => {
			if (invalidPinTimeoutRef.current) clearTimeout(invalidPinTimeoutRef.current);
		};
	}, []);

	return (
		<BgGradient>
			<View style={[styles.container, { paddingTop: insets.top }]}>
				<View style={styles.pinInputContainer}>
					<Text style={styles.text}>Enter your current PIN</Text>
					<PinInput
						pin={pin}
						isPinIncorrect={isPinIncorrect}
						isLoading={isPinIncorrect ? false : pin.length === PIN_LENGTH}
					/>
				</View>
				<Keypad pin={pin} setPin={setPin} onPinChange={checkPin} />
			</View>
		</BgGradient>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	pinInputContainer: {
		flexGrow: 1,
		gap: 32,
		justifyContent: "center",
		alignItems: "center"
	},
	text: {
		color: themeColors.white[90],
		fontSize: 20,
		fontWeight: "bold"
	}
});
