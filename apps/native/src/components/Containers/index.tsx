import { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type Props = PropsWithChildren<{ style?: StyleProp<ViewStyle> }>;

export function PageContainer({ children, style }: Props) {
	return <View style={StyleSheet.compose({ padding: 16 }, style)}>{children}</View>;
}
