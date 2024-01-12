import { c } from "@utils/styles.ts";

type Props = {
	label: string;
	type?: "button" | "submit" | "reset";
	onClick?: () => void;
	className?: string;
};

export function Button({ label, type, onClick, className }: Props) {
	return (
		<button
			type={type}
			onClick={onClick}
			className={c("bg-th-sky w-full h-12.5 text-md rounded-xl", className)}
		>
			{label}
		</button>
	);
}
