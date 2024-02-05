import { ChangeEvent, FocusEvent, HTMLAttributes, HTMLInputTypeAttribute, ReactNode } from "react";

import { Show } from "@components/Show";

import { c } from "@utils/styles.ts";

type Props = {
	value?: string | number;
	defaultValue?: string | number;
	name?: string;
	type?: HTMLInputTypeAttribute;
	id?: string;
	label?: string;
	disabled?: boolean;
	readOnly?: boolean;
	placeholder?: string;
	maxLength?: number;
	minLength?: number;
	inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
	onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
	className?: string;
	rightIcon?: ReactNode;
	error?: string;
};

export function Input(props: Props) {
	return (
		<div className="space-y-2">
			<Show when={props.label}>
				<label className="text-th-white/80 pl-2" htmlFor={props.id}>
					{props.label}
				</label>
			</Show>
			<div className="flex items-center w-full relative">
				<Show when={props.rightIcon}>
					<div className="absolute right-0 size-12 flex justify-center items-center">
						{props.rightIcon}
					</div>
				</Show>
				<input
					type={props.type}
					name={props.name}
					id={props.id}
					disabled={props.disabled}
					readOnly={props.readOnly}
					minLength={props.minLength}
					maxLength={props.maxLength}
					inputMode={props.inputMode}
					value={props.value}
					defaultValue={props.defaultValue}
					onChange={props.onChange}
					onFocus={props.onFocus}
					onBlur={props.onBlur}
					placeholder={props.placeholder}
					className={c(
						"w-full rounded-2xl pl-4 h-12 tracking-widest placeholder:tracking-normal bg-th-white bg-opacity-5 focus:bg-opacity-10",
						props.error ? "text-th-red" : "text-th-white ",
						props.rightIcon ? "pr-12" : "p-4",
						props.className
					)}
				/>
			</div>
			<Show when={props.error}>
				<div className="text-th-red text-sm pl-2">{props.error}</div>
			</Show>
		</div>
	);
}
