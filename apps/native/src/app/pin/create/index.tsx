import { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

import { useSharedValue } from "react-native-reanimated";

import { AppText } from "@components/AppText";
import { BgGradient } from "@components/Gradient";
import { SubPageHeader } from "@components/Header/SubPageHeader.tsx";
import { Keypad } from "@components/Pin/Keypad";
import { PinInput } from "@components/Pin/PinInput";

import { PIN_LENGTH } from "@libs/utils/src/auth.ts";

import { TH_RED, TH_WHITE_90 } from "@styles/colors.ts";

export default function CreatePinPage() {
	const router = useRouter();
	const fakeScrollOffset = useSharedValue(0);

	const [pin, setPin] = useState<number[]>([]);
	const [isPinInvalid, setIsPinInvalid] = useState(false);
	const [isCommonPassword, setIsCommonPassword] = useState(false);

	const invalidPinTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const resetPinTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const checkPin = (pinValue: string) => {
		setIsCommonPassword(false);

		if (pinValue.length !== PIN_LENGTH) return;
		if (pinValue === "000000") {
			setIsCommonPassword(true);
			setIsPinInvalid(true);

			invalidPinTimeoutRef.current = setTimeout(() => {
				setPin([]);
				setIsPinInvalid(false);
			}, 1000);

			return;
		}

		redirectTimeoutRef.current = setTimeout(() => {
			router.navigate({ pathname: "/pin/create/confirm", params: { pin: pinValue } });
			resetPinTimeoutRef.current = setTimeout(() => setPin([]), 200);
		}, 500);
	};

	useEffect(() => {
		return () => {
			if (invalidPinTimeoutRef.current) clearTimeout(invalidPinTimeoutRef.current);
			if (redirectTimeoutRef.current) clearTimeout(redirectTimeoutRef.current);
			if (resetPinTimeoutRef.current) clearTimeout(resetPinTimeoutRef.current);
		};
	}, []);

	return (
		<BgGradient>
			<SubPageHeader title="" scrollOffset={fakeScrollOffset} />
			<View style={styles.container}>
				<View style={styles.pinInputContainer}>
					<AppText
						fontSize="xl"
						textAlign="center"
						color={TH_WHITE_90}
						fontWeight="700"
						style={{ marginBottom: 8 }}
						value="Create a PIN"
					/>

					<View style={{ marginBottom: 32 }}>
						<AppText textAlign="center">Please enter a secure 6-digit PIN.</AppText>
						<AppText textAlign="center">Remember it as no way to recover it.</AppText>
					</View>

					<PinInput
						pin={pin}
						isPinIncorrect={isPinInvalid}
						isLoading={isPinInvalid ? false : pin.length === PIN_LENGTH}
					/>

					<AppText
						fontSize="sm"
						color={TH_RED}
						textAlign="center"
						style={{ marginTop: 24, height: 20 }}
						value={isCommonPassword ? "Entered PIN is too common to guess" : ""}
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
