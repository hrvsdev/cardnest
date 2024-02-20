import { useEffect, useRef, useState } from "react";
import { Pressable } from "react-native";
import * as Clipboard from "expo-clipboard";
import * as Haptic from "expo-haptics";

import { IconCheck, IconCopy } from "tabler-icons-react-native";

import { themeColors } from "@styles/colors.ts";

type Props = {
	text: string;
};

export function CopyButton({ text }: Props) {
	const [isCopied, setIsCopied] = useState(false);

	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const onClick = async () => {
		await Clipboard.setStringAsync(text);
		setIsCopied(true);
		await Haptic.notificationAsync();
		timeoutRef.current = setTimeout(() => setIsCopied(false), 2000);
	};

	useEffect(() => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
	}, []);

	const Copy = <IconCopy size={22} stroke={1.5} color={themeColors.white.DEFAULT} />;
	const Check = <IconCheck size={22} color={themeColors.white.DEFAULT} />;

	return (
		<Pressable
			style={({ pressed }) => ({
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				transform: [{ translateY: pressed ? 1 : 0 }]
			})}
			onPress={onClick}
		>
			{isCopied ? Check : Copy}
		</Pressable>
	);
}
