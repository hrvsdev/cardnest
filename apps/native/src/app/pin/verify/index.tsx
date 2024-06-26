import { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

import { useSharedValue } from "react-native-reanimated";

import { AppText } from "@components/AppText";
import { BgGradient } from "@components/Gradient";
import { SubPageHeader } from "@components/Header/SubPageHeader.tsx";
import { Keypad } from "@components/Pin/Keypad";
import { PinInput } from "@components/Pin/PinInput";

import { useAfterPinVerified, useSetAfterPinVerified } from "@libs/hooks/src/actions";
import { useVerifyPin } from "@libs/hooks/src/auth";

import { PIN_LENGTH } from "@libs/utils/src/auth.ts";

import { TH_RED, TH_WHITE_90 } from "@styles/colors.ts";

export default function VerifyPinBeforeActionPage() {
	const [pin, setPin] = useState<number[]>([]);
	const [isPinIncorrect, setIsPinIncorrect] = useState(false);

	const fakeScrollOffset = useSharedValue(0);

	const incorrectPinTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const verifyPin = useVerifyPin();
	const afterPinVerified = useAfterPinVerified();
	const setAfterPinVerified = useSetAfterPinVerified();

	const checkPin = (pinValue: string) => {
		if (pinValue.length !== PIN_LENGTH) return;

		const isPinCorrect = verifyPin(pinValue);

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
					<AppText
						size="xl"
						align="center"
						color={TH_WHITE_90}
						weight="bold"
						style={{ marginBottom: 8 }}
						value="Confirm your PIN"
					/>

					<View style={{ marginBottom: 32 }}>
						<AppText align="center">Please enter your pin to proceed.</AppText>
					</View>

					<PinInput
						pin={pin}
						isPinIncorrect={isPinIncorrect}
						isLoading={isPinIncorrect ? false : pin.length === PIN_LENGTH}
					/>

					<AppText
						size="sm"
						color={TH_RED}
						align="center"
						style={{ marginTop: 24, height: 20 }}
						value={isPinIncorrect ? "Entered PIN is incorrect" : ""}
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
		justifyContent: "center",
		alignItems: "center"
	}
});
