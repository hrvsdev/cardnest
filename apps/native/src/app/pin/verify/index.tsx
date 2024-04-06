import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { useSharedValue } from "react-native-reanimated";

import { BgGradient } from "@components/Gradient";
import { SubPageHeader } from "@components/Header/SubPageHeader.tsx";
import { Keypad } from "@components/Pin/Keypad";
import { PinInput } from "@components/Pin/PinInput";
import { Show } from "@components/Show";

import { useAfterPinVerified, useSetAfterPinVerified } from "@libs/hooks/src/actions";
import { useVerifyPin } from "@libs/hooks/src/auth";

import { PIN_LENGTH } from "@libs/utils/src/auth.ts";

import { themeColors } from "@styles/colors.ts";

export default function VerifyPinBeforeActionPage() {
	const [pin, setPin] = useState<number[]>([]);
	const [isPinIncorrect, setIsPinIncorrect] = useState(false);

	const fakeScrollOffset = useSharedValue(0);

	const incorrectPinTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const verifyPin = useVerifyPin();
	const afterPinVerified = useAfterPinVerified();
	const setAfterPinVerified = useSetAfterPinVerified();

	const checkPin = async (pinValue: string) => {
		if (pinValue.length !== PIN_LENGTH) return;

		const isPinCorrect = await verifyPin(pinValue);

		if (!isPinCorrect) {
			setIsPinIncorrect(true);
			incorrectPinTimeoutRef.current = setTimeout(() => {
				setPin([]);
				setIsPinIncorrect(false);
			}, 1000);

			return;
		}

		if (afterPinVerified) {
			redirectTimeoutRef.current = setTimeout(() => {
				afterPinVerified();
				setAfterPinVerified(null);
			}, 500);
		}
	};

	useEffect(() => {
		return () => {
			if (incorrectPinTimeoutRef.current) clearTimeout(incorrectPinTimeoutRef.current);
			if (redirectTimeoutRef.current) clearTimeout(redirectTimeoutRef.current);
		};
	}, []);

	return (
		<BgGradient>
			<SubPageHeader title="" scrollOffset={fakeScrollOffset} />
			<View style={styles.container}>
				<View style={styles.pinInputContainer}>
					<Text style={styles.heading}>Confirm your PIN</Text>

					<View style={{ marginBottom: 32 }}>
						<Text style={styles.descText}>Please enter your pin to proceed.</Text>
					</View>

					<PinInput
						pin={pin}
						isPinIncorrect={isPinIncorrect}
						isLoading={isPinIncorrect ? false : pin.length === PIN_LENGTH}
					/>

					<Text style={styles.errorText}>
						<Show when={isPinIncorrect}>Entered PIN is incorrect</Show>
					</Text>
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
		justifyContent: "center",
		alignItems: "center"
	},
	heading: {
		color: themeColors.white[90],
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 8
	},
	descText: {
		color: themeColors.white[80],
		fontSize: 16,
		textAlign: "center"
	},
	errorText: {
		color: themeColors.red,
		fontSize: 14,
		height: 20,
		textAlign: "center",
		marginTop: 24
	}
});
