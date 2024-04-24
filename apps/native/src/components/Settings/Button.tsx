import { ReactElement, ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

import { IconChevronRight, TablerIconsProps } from "tabler-icons-react-native";

import { AppText } from "@components/AppText";

import { opacity, TH_RED, TH_RED_60, TH_WHITE, TH_WHITE_50 } from "@styles/colors.ts";

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
	const color = isDanger ? TH_RED : TH_WHITE;

	return (
		<View style={styles.contentContainer}>
			<View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
				<Icon size={20} color={color} />
				<AppText color={color}>{title}</AppText>
			</View>
			<View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
				<IconChevronRight size={20} color={isDanger ? TH_RED_60 : TH_WHITE_50} />
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
		backgroundColor: opacity(TH_WHITE, 0.075)
	},
	dangerContainer: {
		backgroundColor: opacity(TH_RED, 0.125)
	},
	contentContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		height: 44,
		paddingHorizontal: 12
	}
});
