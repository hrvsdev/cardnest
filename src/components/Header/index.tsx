import { Fragment, useEffect, useRef, useState } from "react";

import { IconCircleX, IconSearch } from "@tabler/icons-react";

import { Show } from "@components/Show";

import { c } from "@utils/styles.ts";

const OFFSET = 60;

export function Header() {
	const [value, setValue] = useState("");
	const [isOpaque, setIsOpaque] = useState(false);

	const inputRef = useRef<HTMLInputElement>(null);
	const showClearIcon = value.length > 0;

	const onClear = () => {
		setValue("");
		inputRef.current?.focus();
	};

	const onScroll = () => {
		if (!isOpaque && window.scrollY > OFFSET) {
			setIsOpaque(true);
		} else if (isOpaque && window.scrollY <= OFFSET) {
			setIsOpaque(false);
		}
	};

	useEffect(() => {
		onScroll();

		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, [isOpaque]);

	return (
		<Fragment>
			<h1 className="font-semibold text-heading pl-0.5 pt-8 mx-4">Home</h1>
			<div
				className={c(
					"sticky top-0 p-4 backdrop-blur-md transition-[background-color] duration-500",
					isOpaque && "bg-th-black/80 border-b border-th-white/10"
				)}
			>
				<div className="flex items-center w-full relative">
					<IconSearch size={24} className="absolute text-th-white left-3 opacity-60" />
					<Show when={showClearIcon}>
						<IconCircleX
							size={24}
							onClick={onClear}
							className="absolute text-th-white right-3 opacity-60 peer"
						/>
					</Show>
					<input
						id="search"
						autoComplete="off"
						ref={inputRef}
						value={value}
						onChange={(e) => setValue(e.target.value)}
						placeholder="Enter card number, bank or network"
						className={c(
							"w-full rounded-2xl pl-12 py-3 text-th-white bg-th-white bg-opacity-5 focus:bg-opacity-10 peer-active:bg-opacity-10",
							showClearIcon ? "pr-12" : "pr-4"
						)}
					/>
				</div>
			</div>
		</Fragment>
	);
}
