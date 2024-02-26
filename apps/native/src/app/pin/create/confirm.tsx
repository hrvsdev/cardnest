import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { useSharedValue } from "react-native-reanimated";

import { BgGradient } from "@components/Gradient";
import { SubPageHeader } from "@components/Header/SubPageHeader.tsx";
import { Keypad } from "@components/Pin/Keypad";
import { PinInput } from "@components/Pin/PinInput";
import { Show } from "@components/Show";

import { PIN_LENGTH } from "@libs/utils/src/auth.ts";

import { themeColors } from "@styles/colors.ts";

export default function Page() {
	const params = useLocalSearchParams();
	const router = useRouter();
	const fakeScrollOffset = useSharedValue(0);

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

		redirectTimeoutRef.current = setTimeout(async () => {
			router.navigate("/user/security");
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
					<Text style={styles.heading}>Confirm the PIN</Text>

					<View style={{ marginBottom: 32 }}>
						<Text style={styles.descText}>Please confirm the PIN you entered.</Text>
						<Text style={styles.descText}>Remember it as no way to recover it.</Text>
					</View>

					<PinInput
						pin={pin}
						isPinIncorrect={isPinInvalid}
						isLoading={isPinInvalid ? false : pin.length === PIN_LENGTH}
					/>

					<Text style={styles.errorText}>
						<Show when={isPinDifferent}>Both PIN don't match</Show>
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
