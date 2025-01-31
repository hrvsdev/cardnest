import { ChangeEvent, FocusEvent, HTMLAttributes, HTMLInputTypeAttribute, ReactNode, Ref } from "react";

import { Show } from "@components/Show";

import { c } from "@utils/styles.ts";

type Props = {
	ref: Ref<HTMLInputElement>;
	value?: string | number;
	type?: HTMLInputTypeAttribute;
	id?: string;
	label?: string;
	readOnly?: boolean;
	placeholder?: string;
	maxLength?: number;
	inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
	onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	error?: InputError;
};

export type InputError = {
	hasError: boolean;
	message: string;
};

export function Input(props: Props) {
	const error = props.error ?? { message: "Please enter a valid value", hasError: false };

	return (
		<div className="w-full">
			<Show when={props.label}>
				<label className="inline-block pb-2 pl-2" htmlFor={props.id}>
					{props.label}
				</label>
			</Show>
			<div className="w-full relative">
				<Show when={props.leftIcon}>
					<div className="center absolute left-0">{props.leftIcon}</div>
				</Show>
				<Show when={props.rightIcon}>
					<div className="center absolute right-0">{props.rightIcon}</div>
				</Show>
				<input
					ref={props.ref}
					type={props.type}
					id={props.id}
					readOnly={props.readOnly}
					maxLength={props.maxLength}
					inputMode={props.inputMode}
					value={props.value}
					onChange={props.onChange}
					onFocus={props.onFocus}
					onBlur={props.onBlur}
					placeholder={props.placeholder}
					className={c(
						"w-full h-12 rounded-1.5xl bg-th-white bg-opacity-07 focus:bg-opacity-10 caret-th-sky",
						props.error?.hasError ? "text-th-red" : "text-th-white",
						props.leftIcon ? "pl-12" : "pl-4",
						props.rightIcon ? "pr-12" : "pr-4"
					)}
				/>
			</div>

			<Show when={error.hasError}>
				<p className="text-th-red text-sm pt-2 pl-2">{error.message}</p>
			</Show>
		</div>
	);
}
