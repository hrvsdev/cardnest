import { useRef, useState } from "react";

import { IconCircleX, IconSearch } from "@tabler/icons-react";

import { c } from "@utils/styles.ts";
import { Show } from "@components/Show";

export function Header() {
	const [value, setValue] = useState("");

	const inputRef = useRef<HTMLInputElement>(null);
	const showClearIcon = value.length > 0;

	const onClear = () => {
		setValue("");
		inputRef.current?.focus();
	};

	return (
		<div className="p-4">
			<h1 className="font-semibold text-heading mb-4 pl-0.5">Home</h1>
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
	);
}
