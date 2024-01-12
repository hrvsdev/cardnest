import { Link } from "react-router-dom";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { motion, useScroll, useTransform } from "framer-motion";

import { backgroundRange, borderOpacityRange } from "@components/Header/shared";

const HEADER_TOP_OFFSET = 0;
const HEADER_BOTTOM_OFFSET = 16;

const inputRange = [HEADER_TOP_OFFSET, HEADER_BOTTOM_OFFSET];

export function SubPageHeader({ title }: { title: string }) {
	const { scrollY } = useScroll();

	const borderOpacity = useTransform(scrollY, inputRange, borderOpacityRange);
	const background = useTransform(scrollY, inputRange, backgroundRange);

	return (
		<motion.div style={{ background }} className="sticky top-0 z-10 backdrop-blur-md">
			<div className="flex items-center justify-center relative w-full h-12">
				<Link to=".." className="flex items-center gap-1 absolute left-0 h-full px-4 text-th-sky">
					<ChevronLeftIcon strokeWidth={2.5} className="size-4" />
					<span className="text-sm">Back</span>
				</Link>
				<div>{title}</div>
			</div>
			<motion.div style={{ height: 1, opacity: borderOpacity }} className="bg-th-white" />
		</motion.div>
	);
}
