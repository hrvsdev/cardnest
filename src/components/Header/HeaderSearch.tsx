import { useRef } from "react";

import { IconCircleX, IconSearch } from "@tabler/icons-react";

import { ShowAnimated } from "@components/Show";
import { Spacer } from "@components/Spacer";

import { c } from "@utils/styles.ts";

type SearchProps = {
	value: string;
	onChange: (value: string) => void;
	noOfResults: number;
	totalResults: number;
};

type SearchResultStatusProps = {
	noOfResults: number;
	totalResults: number;
	clear: () => void;
};

export function HeaderSearch({ value, onChange, noOfResults, totalResults }: SearchProps) {
	const inputRef = useRef<HTMLInputElement | null>(null);

	const isNotBlank = value.trim().length > 0;

	const onClear = () => {
		onChange("");
		inputRef.current?.focus();
	};

	return (
		<div className="w-full relative pt-4 px-4">
			<SearchIcon />
			<ClearButton show={isNotBlank} onClick={onClear} />

			<input
				id="search"
				autoComplete="off"
				ref={inputRef}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder="Enter card number, bank or network"
				className={c(
					"w-full h-12 rounded-1.5xl pl-12 text-th-white bg-th-white bg-opacity-07 focus:bg-opacity-10",
					isNotBlank ? "pr-12" : "pr-4"
				)}
			/>

			<Spacer size={8} />

			<ShowAnimated when={isNotBlank}>
				<SearchResultStatus noOfResults={noOfResults} totalResults={totalResults} clear={onClear} />
			</ShowAnimated>

			<Spacer size={8} />
		</div>
	);
}

function SearchResultStatus({ noOfResults, totalResults, clear }: SearchResultStatusProps) {
	return (
		<div className="flex justify-between px-2">
			<p className="text-sm">
				<span>Showing </span>
				<span className="text-th-sky">{noOfResults} </span>
				<span>out of </span>
				<span className="text-th-sky">{totalResults} </span>
				<span>{noOfResults === 1 ? "card" : "cards"}</span>
			</p>

			<button onClick={clear} className="text-sm text-th-sky underline underline-offset-[3px]">
				Clear
			</button>
		</div>
	);
}

function SearchIcon() {
	return (
		<div className="center absolute left-4 size-12">
			<IconSearch className="text-th-white/60" />
		</div>
	);
}

function ClearButton({ show, onClick }: { show: boolean; onClick: () => void }) {
	if (!show) return null;
	return (
		<div className="center absolute right-4 size-12" onClick={onClick}>
			<IconCircleX className="text-th-white/60" />
		</div>
	);
}
