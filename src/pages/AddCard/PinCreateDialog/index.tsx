import { useEffect, useRef } from "react";

import { BottomSheet } from "@components/BottomSheet";
import { Button } from "@components/Button";

type Props = {
	show: boolean;
	onConfirm: () => void;
	onClose: () => void;
	onSkip: () => void;
};

export function PinCreateDialog({ show, onConfirm, onClose, onSkip }: Props) {
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const delayOnClick = (cb: () => void) => {
		return () => {
			onClose();
			timeoutRef.current = setTimeout(cb, 300);
		};
	};

	useEffect(() => {
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, []);

	return (
		<BottomSheet onClose={onClose} show={show}>
			<h1 className="text-th-white text-center text-xl font-bold">Create a PIN</h1>
			<p className="text-th-white/85 text-center font-medium">
				It is recommended that you create a PIN to secure your cards so that they can't be accessed
				by anyone else.
				<br />
				You can also skip this and create later.
			</p>
			<div className="flex flex-col gap-3 mt-10">
				<Button label="Skip" variant="flat" onClick={delayOnClick(onSkip)} />
				<Button label="Create PIN" theme="danger" onClick={delayOnClick(onConfirm)} />
			</div>
		</BottomSheet>
	);
}
