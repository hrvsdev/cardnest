import { c } from "@utils/styles.ts";

type Theme = "primary" | "danger";
type Variant = "solid" | "flat";

type Props = {
	label: string;
	type?: "button" | "submit" | "reset";
	theme?: Theme;
	variant?: Variant;
	onClick?: () => void;
	className?: string;
};

const styles: Record<Variant, Record<Theme, string>> = {
	solid: {
		primary: "bg-th-sky shadow-th-sky/15 text-th-white shadow-lg",
		danger: "bg-th-red shadow-th-red/25 text-th-white shadow-lg"
	},
	flat: {
		primary: "text-th-sky bg-th-sky/10",
		danger: "text-th-red bg-th-red/10"
	}
};

export function Button(props: Props) {
	const { label, type, onClick, className, theme = "primary", variant = "solid" } = props;
	return (
		<button
			type={type}
			onClick={onClick}
			className={c(
				"w-full h-12 text-md rounded-2xl transition-all duration-200 hover:brightness-110 active:scale-98",
				styles[variant][theme],
				className
			)}
		>
			{label}
		</button>
	);
}
