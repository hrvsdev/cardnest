import { ReactNode } from "react";
import { Link } from "react-router-dom";

import { IconChevronLeft } from "@tabler/icons-react";
import { motion, useScroll, useTransform } from "framer-motion";

import { backgroundRange, borderOpacityRange } from "@components/Header/shared";
import { Show } from "@components/Show";

const HEADER_TOP_OFFSET = 0;
const HEADER_BOTTOM_OFFSET = 16;

const inputRange = [HEADER_TOP_OFFSET, HEADER_BOTTOM_OFFSET];

type Props = {
	title: string;
	rightButtonLabel?: string;
	rightButtonIcon?: ReactNode;
	onRightButtonClick?: () => void;
};

export function SubPageHeader(props: Props) {
	const { scrollY } = useScroll();

	const borderOpacity = useTransform(scrollY, inputRange, borderOpacityRange);
	const background = useTransform(scrollY, inputRange, backgroundRange);

	return (
		<motion.div style={{ background }} className="sticky top-0 z-10 backdrop-blur-md">
			<div className="flex items-center justify-center relative w-full h-12">
				<Link to=".." className="flex items-center gap-1 absolute left-0 h-full px-4 text-th-sky">
					<IconChevronLeft strokeWidth={2.5} size={20} />
					<span className="text-sm">Back</span>
				</Link>
				<div>{props.title}</div>
				<Show when={props.rightButtonLabel || props.rightButtonIcon}>
					<button
						className="flex items-center gap-1 absolute right-0 h-full px-4 text-th-sky"
						onClick={props.onRightButtonClick}
					>
						{props.rightButtonIcon}
						<span className="text-sm">{props.rightButtonLabel}</span>
					</button>
				</Show>
			</div>
			<motion.div style={{ height: 1, opacity: borderOpacity }} className="bg-th-white" />
		</motion.div>
	);
}
