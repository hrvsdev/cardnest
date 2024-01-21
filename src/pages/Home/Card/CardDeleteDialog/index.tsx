import { BottomSheet } from "@components/BottomSheet";
import { Button } from "@components/Button";

type Props = {
	onConfirm: () => void;
	onClose: () => void;
};

export function CardDeleteDialog({ onConfirm, onClose }: Props) {
	return (
		<BottomSheet onClose={onClose}>
			<h1 className="text-th-white text-center text-xl font-bold">Delete card</h1>
			<p className="text-th-white text-center font-medium">
				Are you sure you want to delete this card?
				<br />
				This action cannot be undone.
			</p>
			<div className="flex flex-col gap-3 mt-10">
				<Button label="Cancel" variant="flat" onClick={onClose} />
				<Button label="Confirm" theme="danger" onClick={onConfirm} />
			</div>
		</BottomSheet>
	);
}
