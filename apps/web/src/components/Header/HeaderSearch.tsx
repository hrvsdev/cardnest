import { useRef } from "react";

import { IconCircleX, IconSearch } from "@tabler/icons-react";
import { motion, useScroll, useTransform } from "framer-motion";

import { backgroundRange, borderOpacityRange } from "@components/Header/shared";
import { Show } from "@components/Show";

import { c } from "@libs/utils/src/styles.ts";

type SearchProps = {
	value: string;
	onChange: (value: string) => void;
};

const TOP_OFFSET = 66;
const BOTTOM_OFFSET = 82;

const inputRange = [TOP_OFFSET, BOTTOM_OFFSET];

export function HeaderSearch({ value, onChange }: SearchProps) {
	const { scrollY } = useScroll();

	const borderOpacity = useTransform(scrollY, inputRange, borderOpacityRange);
	const background = useTransform(scrollY, inputRange, backgroundRange);

	const inputRef = useRef<HTMLInputElement>(null);
	const showClearIcon = value.trim().length > 0;

	const onClear = () => {
		onChange("");
		inputRef.current?.focus();
	};

	return (
		<motion.div style={{ background }} className="sticky top-0 backdrop-blur-md">
			<div className="flex items-center w-full relative p-4">
				<IconSearch size={24} className="absolute text-th-white left-7 opacity-60" />
				<Show when={showClearIcon}>
					<IconCircleX
						size={24}
						onClick={onClear}
						className="absolute text-th-white right-7 opacity-60 peer"
					/>
				</Show>
				<input
					id="search"
					autoComplete="off"
					ref={inputRef}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder="Enter card number, bank or network"
					className={c(
						"w-full rounded-2xl pl-12 py-3 text-th-white bg-th-white bg-opacity-5 focus:bg-opacity-10 peer-active:bg-opacity-10",
						showClearIcon ? "pr-12" : "pr-4"
					)}
				/>
			</div>
			<motion.div style={{ height: 1, opacity: borderOpacity }} className="bg-th-white" />
		</motion.div>
	);
}
