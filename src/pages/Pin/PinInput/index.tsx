import styles from "./styles.module.css";

import { c } from "@utils/styles.ts";

type Props = {
	pin: number[];
	isPinIncorrect: boolean;
};

const PIN_LENGTH_ARR = [1, 2, 3, 4, 5, 6];

export function PinInput({ isPinIncorrect, pin }: Props) {
	return (
		<div
			className={c(
				"grid grid-cols-6 items-center justify-center gap-3",
				isPinIncorrect && styles.shake_anim
			)}
		>
			{PIN_LENGTH_ARR.map((n) => (
				<div
					key={n}
					className={c(
						"w-3 border aspect-square rounded-full transition-colors",
						pin.length >= n && (isPinIncorrect ? "bg-red-500" : "bg-th-white"),
						isPinIncorrect ? "border-red-500" : "border-th-white"
					)}
				/>
			))}
		</div>
	);
}
