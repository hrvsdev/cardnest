import { PropsWithChildren } from "react";
import { ScrollView, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = PropsWithChildren<{ style?: StyleProp<ViewStyle> }>;

export function PageRoot({ children, style }: Props) {
	const insets = useSafeAreaInsets();
	const styles = StyleSheet.compose({ flex: 1, paddingTop: insets.top }, style);

	return <ScrollView style={styles}>{children}</ScrollView>;
}

export function PageContainer({ children, style }: Props) {
	const styles = StyleSheet.compose({ padding: 16 }, style);
	return <View style={styles}>{children}</View>;
}
