import { useEffect, useRef } from "react";

import { BottomSheet } from "@components/BottomSheet";
import { Button } from "@components/Button";

type Props = {
	show: boolean;
	onConfirm: () => void;
	onClose: () => void;
};

export function RemovePinDialog({ show, onConfirm, onClose }: Props) {
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const onDialogConfirm = () => {
		onClose();
		timeoutRef.current = setTimeout(onConfirm, 300);
	};

	useEffect(() => {
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, []);

	return (
		<BottomSheet onClose={onClose} show={show}>
			<h1 className="text-th-white text-center text-xl font-bold">Remove app password</h1>
			<p className="text-th-white/85 text-center font-medium">
				Are you sure you want to remove the password?
				<br />
				Anyone who has access to your device will be able to see your data.
			</p>
			<div className="flex flex-col gap-3 mt-10">
				<Button title="Cancel" variant="flat" onClick={onClose} />
				<Button title="Confirm" theme="danger" onClick={onDialogConfirm} />
			</div>
		</BottomSheet>
	);
}
