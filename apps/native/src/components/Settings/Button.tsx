import { ReactElement, ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

import { IconChevronRight, TablerIconsProps } from "tabler-icons-react-native";

import { opacity, themeColors } from "@styles/colors.ts";

type PositionProps = {
	isFirst?: boolean;
	isLast?: boolean;
};

type ContentProps = PositionProps & {
	Icon: (props: TablerIconsProps) => ReactElement;
	title: string;
	isDanger?: boolean;
};

type WrapperProps = PositionProps & {
	isDanger?: boolean;
	children: ReactNode;
};

type SettingsButtonProps = ContentProps & {
	onPress: () => void;
};

type SettingsLinkProps = ContentProps & {
	href: string;
};

export function SettingsButton({ onPress, ...props }: SettingsButtonProps) {
	return (
		<Wrapper isDanger={props.isDanger} isFirst={props.isFirst} isLast={props.isLast}>
			<Pressable onPress={onPress}>
				<Content {...props} />
			</Pressable>
		</Wrapper>
	);
}

export function SettingsLink({ href, ...props }: SettingsLinkProps) {
	const router = useRouter();

	return (
		<Wrapper isDanger={props.isDanger} isFirst={props.isFirst} isLast={props.isLast}>
			<Pressable onPress={() => router.navigate(href)}>
				<Content {...props} />
			</Pressable>
		</Wrapper>
	);
}

function Content({ title, Icon, isDanger }: ContentProps) {
	const color = isDanger ? themeColors.red : themeColors.white.DEFAULT;

	return (
		<View style={styles.contentContainer}>
			<View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
				<Icon size={20} color={color} />
				<Text style={{ fontSize: 16, color: color }}>{title}</Text>
			</View>
			<View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
				<IconChevronRight
					size={20}
					color={isDanger ? opacity(themeColors.red, 0.6) : opacity(themeColors.white.DEFAULT, 0.5)}
				/>
			</View>
		</View>
	);
}

function Wrapper({ isDanger, children, isFirst, isLast }: WrapperProps) {
	const borderRadiusStyle = {
		borderTopLeftRadius: isFirst ? 12 : 2,
		borderTopRightRadius: isFirst ? 12 : 2,
		borderBottomLeftRadius: isLast ? 12 : 2,
		borderBottomRightRadius: isLast ? 12 : 2
	};

	const style = StyleSheet.compose(
		isDanger ? styles.dangerContainer : styles.container,
		borderRadiusStyle
	);

	return <View style={style}>{children}</View>;
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: opacity(themeColors.white.DEFAULT, 0.075)
	},
	dangerContainer: {
		backgroundColor: opacity(themeColors.red, 0.125)
	},
	contentContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		height: 44,
		paddingHorizontal: 12
	}
});
