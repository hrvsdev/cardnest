import { PropsWithChildren } from "react";
import { ScrollView, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { BgGradient } from "@components/Gradient";

type Props = PropsWithChildren<{ style?: StyleProp<ViewStyle> }>;

export function PageRoot({ children, style }: Props) {
	const styles = StyleSheet.compose({ flex: 1 }, style);

	return (
		<BgGradient>
			<ScrollView keyboardShouldPersistTaps="handled" keyboardDismissMode="interactive" style={styles}>
				{children}
			</ScrollView>
		</BgGradient>
	);
}

export function PageContainer({ children, style }: Props) {
	const styles = StyleSheet.compose({ padding: 16, paddingBottom: 72 }, style);
	return <View style={styles}>{children}</View>;
}
