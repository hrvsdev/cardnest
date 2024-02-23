import { PropsWithChildren } from "react";
import { ScrollView, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { BgGradient } from "@components/Gradient";

type Props = PropsWithChildren<{ style?: StyleProp<ViewStyle> }>;

export function PageRoot({ children, style }: Props) {
	return (
		<BgGradient>
			<ScrollView
				keyboardShouldPersistTaps="handled"
				keyboardDismissMode="on-drag"
				contentContainerStyle={style}
			>
				{children}
			</ScrollView>
		</BgGradient>
	);
}

export function PageContainer({ children, style }: Props) {
	const styles = StyleSheet.compose({ padding: 16, paddingBottom: 72 }, style);
	return <View style={styles}>{children}</View>;
}
