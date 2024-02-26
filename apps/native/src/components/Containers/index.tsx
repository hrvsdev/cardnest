import { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import Animated, { useAnimatedRef, useScrollViewOffset } from "react-native-reanimated";

import { BgGradient } from "@components/Gradient";
import { SubPageHeader } from "@components/Header/SubPageHeader.tsx";

type Props = PropsWithChildren<{ style?: StyleProp<ViewStyle> }>;

type SubPageHeaderProps = Omit<Parameters<typeof SubPageHeader>[0], "scrollOffset">;

export function PageRoot({ children, style, ...headerProps }: Props & SubPageHeaderProps) {
	const animatedRef = useAnimatedRef();
	const scrollOffset = useScrollViewOffset(animatedRef);

	return (
		<BgGradient>
			<Animated.ScrollView
				ref={animatedRef}
				keyboardShouldPersistTaps="handled"
				keyboardDismissMode="on-drag"
				contentContainerStyle={style}
				stickyHeaderIndices={[0]}
			>
				<SubPageHeader {...headerProps} scrollOffset={scrollOffset} />

				{children}
			</Animated.ScrollView>
		</BgGradient>
	);
}

export function PageContainer({ children, style }: Props) {
	const styles = StyleSheet.compose({ padding: 16, paddingBottom: 72 }, style);
	return <View style={styles}>{children}</View>;
}
