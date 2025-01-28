import styles from "./styles.module.css";

import { c } from "@utils/styles.ts";

type Props = {
	pin: string;
	hasError?: boolean;
	isLoading?: boolean;
};

type DotProps = {
	isFilled: boolean;
	hasError: boolean;
};

const PIN_LENGTH_ARR = [1, 2, 3, 4, 5, 6];

export function PinInput({ pin, hasError = false, isLoading = false }: Props) {
	return (
		<div className={c("grid grid-cols-6 gap-3", hasError && styles.shake_anim)}>
			{PIN_LENGTH_ARR.map((n) => (
				<Dot key={n} isFilled={n <= pin.length} hasError={hasError} />
			))}
		</div>
	);
}

function Dot({ isFilled, hasError }: DotProps) {
	return (
		<div
			className={c(
				"size-3 border rounded-full transition-colors border-th-white",
				isFilled && "bg-th-white",
				hasError && "bg-th-red border-th-red"
			)}
		/>
	);
}
