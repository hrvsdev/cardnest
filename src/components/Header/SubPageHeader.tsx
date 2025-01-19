import { ReactNode } from "react";
import { Link } from "react-router-dom";

import { IconChevronLeft } from "@tabler/icons-react";
import { motion, useScroll, useTransform } from "framer-motion";

import { backgroundRange, borderOpacityRange } from "@components/Header/shared";

const HEADER_TOP_OFFSET = 0;
const HEADER_BOTTOM_OFFSET = 16;

const inputRange = [HEADER_TOP_OFFSET, HEADER_BOTTOM_OFFSET];

type Props = {
	title: string;
};

type HeaderBackButtonProps = {
	backLabel?: string;
};

type HeaderActionButtonProps = {
	actionLabel?: string;
	actionIcon?: ReactNode;
	onAction?: () => void;
};

export function SubPageHeader(props: Props & HeaderBackButtonProps & HeaderActionButtonProps) {
	const { scrollY } = useScroll();

	const borderOpacity = useTransform(scrollY, inputRange, borderOpacityRange);
	const background = useTransform(scrollY, inputRange, backgroundRange);

	return (
		<motion.div style={{ background }} className="sticky top-0 z-10 backdrop-blur-md">
			<div className="relative center w-full h-12">
				<div className="text-th-white font-bold">{props.title}</div>
				<HeaderBackButton backLabel={props.backLabel} />
				<HeaderActionButton actionLabel={props.actionLabel} actionIcon={props.actionIcon} onAction={props.onAction} />
			</div>
			<motion.div style={{ height: 0.5, opacity: borderOpacity }} className="bg-th-white" />
		</motion.div>
	);
}

function HeaderBackButton(props: HeaderBackButtonProps) {
	return (
		<Link to=".." className="absolute left-0 center gap-1 h-full px-4 text-th-sky">
			<IconChevronLeft size={20} className="pt-0.25" />
			<span>{props.backLabel ?? "Back"}</span>
		</Link>
	);
}

function HeaderActionButton(props: HeaderActionButtonProps) {
	if (!props.actionLabel || !props.onAction) {
		return null;
	}

	return (
		<button className="absolute right-0 center gap-0.5 h-full pl-4 pr-5 text-th-sky" onClick={props.onAction}>
			{props.actionIcon}
			<span>{props.actionLabel}</span>
		</button>
	);
}
