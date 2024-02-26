import { PropsWithChildren } from "react";
import { ScrollView, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import Animated, { useAnimatedRef, useScrollViewOffset } from "react-native-reanimated";

import { BgGradient } from "@components/Gradient";
import { SubPageHeader } from "@components/Header/SubPageHeader.tsx";

type Props = PropsWithChildren<{ gap?: number; style?: StyleProp<ViewStyle> }>;
type SubPageHeaderProps = Omit<Parameters<typeof SubPageHeader>[0], "scrollOffset">;

export function TabPageRoot({ children, style }: Props) {
	return (
		<BgGradient>
			<ScrollView
				keyboardShouldPersistTaps="handled"
				keyboardDismissMode="on-drag"
				contentContainerStyle={style}
				stickyHeaderIndices={[1]}
			>
				{children}
			</ScrollView>
		</BgGradient>
	);
}

export function SubPageRoot({ children, style, gap, ...headerProps }: Props & SubPageHeaderProps) {
	const animatedRef = useAnimatedRef();
	const scrollOffset = useScrollViewOffset(animatedRef);

	return (
		<BgGradient>
			<Animated.ScrollView
				ref={animatedRef}
				keyboardShouldPersistTaps="handled"
				keyboardDismissMode="on-drag"
				stickyHeaderIndices={[0]}
			>
				<SubPageHeader {...headerProps} scrollOffset={scrollOffset} />
				<PageContainer style={style} gap={gap}>
					{children}
				</PageContainer>
			</Animated.ScrollView>
		</BgGradient>
	);
}

export function PageContainer({ children, style, gap }: Props) {
	const styles = StyleSheet.compose({ padding: 16, paddingBottom: 72, gap }, style);
	return <View style={styles}>{children}</View>;
}
