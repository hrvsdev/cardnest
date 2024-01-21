import { c } from "@utils/styles.ts";

type ButtonVariant = "primary" | "danger";

type Props = {
	label: string;
	type?: "button" | "submit" | "reset";
	variant?: ButtonVariant;
	onClick?: () => void;
	className?: string;
};

const variants: Record<ButtonVariant, string> = {
	primary: "bg-th-sky shadow-th-sky/15",
	danger: "bg-th-red shadow-th-red/25",
};

export function Button({ label, type, onClick, className, variant = "primary" }: Props) {
	return (
		<button
			type={type}
			onClick={onClick}
			className={c("w-full h-12 text-md rounded-2xl shadow-lg transition-all dur hover:brightness-110 active:scale-98", variants[variant], className)}
		>
			{label}
		</button>
	);
}
