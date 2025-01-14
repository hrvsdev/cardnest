import { LoadingIcon } from "@components/Loader";
import { Show } from "@components/Show";

import { c } from "@utils/styles.ts";

type Theme = "primary" | "danger";
type Variant = "solid" | "flat";

type Props = {
	title: string;
	onClick?: () => void;

	type?: "button" | "submit" | "reset";

	theme?: Theme;
	variant?: Variant;

	isLoading?: boolean;
	isDisabled?: boolean;
};

export function Button(props: Props) {
	const { title, type, onClick, theme = "primary", variant = "solid", isLoading = false, isDisabled = isLoading } = props;

	const styles: Record<Variant, Record<Theme, string>> = {
		solid: {
			primary: c(isDisabled ? "bg-th-sky/20 text-th-white/60" : "bg-th-sky text-th-white shadow-lg shadow-th-sky/15"),
			danger: c(isDisabled ? "bg-th-red/20 text-th-white/60 " : "bg-th-red text-th-white shadow-lg shadow-th-red/25")
		},
		flat: {
			primary: "text-th-sky bg-th-sky/10",
			danger: "text-th-red bg-th-red/10"
		}
	};

	const className = c(
		"flex justify-center items-center gap-2 w-full h-12 text-md font-bold rounded-1.5xl transition-all duration-200",
		styles[variant][theme],
		isDisabled ? "cursor-not-allowed" : "hover:brightness-110 active:scale-98"
	);

	return (
		<button onClick={onClick} disabled={isDisabled} type={type} className={className}>
			<Show when={isLoading}>
				<LoadingIcon />
			</Show>
			<span>{title}</span>
		</button>
	);
}
