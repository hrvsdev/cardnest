import { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { useSharedValue } from "react-native-reanimated";

import { AppText } from "@components/AppText";
import { BgGradient } from "@components/Gradient";
import { SubPageHeader } from "@components/Header/SubPageHeader.tsx";
import { Keypad } from "@components/Pin/Keypad";
import { PinInput } from "@components/Pin/PinInput";

import { useAfterPinCreated, useSetAfterPinCreated } from "@libs/hooks/src/actions";
import { useSetPin } from "@libs/hooks/src/auth";
import { useChangeOrAddCardsPin } from "@libs/hooks/src/card/data.ts";

import { PIN_LENGTH } from "@libs/utils/src/auth.ts";

import { TH_RED, TH_WHITE_90 } from "@styles/colors.ts";

export default function ConfirmPinPage() {
	const params = useLocalSearchParams();
	const router = useRouter();
	const fakeScrollOffset = useSharedValue(0);

	const setAppPin = useSetPin();
	const changeOrAddCardsPin = useChangeOrAddCardsPin();
	const afterPinCreated = useAfterPinCreated();
	const setAfterPinCreated = useSetAfterPinCreated();

	const [pin, setPin] = useState<number[]>([]);
	const [isPinInvalid, setIsPinInvalid] = useState(false);
	const [isPinDifferent, setIsPinDifferent] = useState(false);

	const invalidPinTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const enteredPin: string | undefined = params.pin as string;

	const checkPin = async (pinValue: string) => {
		setIsPinDifferent(false);

		if (pinValue.length !== PIN_LENGTH) return;
		if (pinValue !== enteredPin) {
			setIsPinDifferent(true);
			setIsPinInvalid(true);

			invalidPinTimeoutRef.current = setTimeout(() => {
				setPin([]);
				setIsPinInvalid(false);
			}, 1000);

			return;
		}

		await changeOrAddCardsPin(pinValue);
		await setAppPin(pinValue);

		redirectTimeoutRef.current = setTimeout(async () => {
			if (afterPinCreated) {
				afterPinCreated().then(() => setAfterPinCreated(null));
			} else {
				router.navigate("/user/security");
			}
		}, 500);
	};

	useEffect(() => {
		return () => {
			if (invalidPinTimeoutRef.current) clearTimeout(invalidPinTimeoutRef.current);
		};
	}, []);

	if (!enteredPin) return null;

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
						value="Confirm the PIN"
					/>

					<View style={{ marginBottom: 32 }}>
						<AppText align="center">Please confirm the PIN you entered.</AppText>
						<AppText align="center">Remember it as no way to recover it.</AppText>
					</View>

					<PinInput
						pin={pin}
						isPinIncorrect={isPinInvalid}
						isLoading={isPinInvalid ? false : pin.length === PIN_LENGTH}
					/>

					<AppText
						size="sm"
						color={TH_RED}
						align="center"
						style={{ marginTop: 24, height: 20 }}
						value={isPinDifferent ? "Both PIN don't match" : ""}
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
