import { ChangeEvent, FocusEvent, HTMLAttributes, HTMLInputTypeAttribute } from "react";

import { Show } from "@components/Show";

import { c } from "@utils/styles.ts";

type Props = {
	value?: string | number;
	defaultValue?: string | number;
	name?: string;
	type?: HTMLInputTypeAttribute;
	id?: string;
	label?: string;
	placeholder?: string;
	maxLength?: number;
	minLength?: number;
	inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
	onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
	className?: string;
};

export function Input(props: Props) {
	return (
		<div className="space-y-2">
			<Show when={props.label}>
				<label className="text-th-white/80 pl-2" htmlFor={props.id}>
					{props.label}
				</label>
			</Show>
			<input
				type={props.type}
				name={props.name}
				id={props.id}
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
					"w-full rounded-2xl px-4 py-3 tracking-widest placeholder:tracking-normal text-th-white bg-th-white bg-opacity-5 focus:bg-opacity-10",
					props.className
				)}
			/>
		</div>
	);
}
