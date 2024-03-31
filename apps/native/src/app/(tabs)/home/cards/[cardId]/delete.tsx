import { BottomSheet } from "@components/BottomSheet";
import { Button } from "@components/Button";
import { DialogButtons, DialogDescription, DialogHeading } from "@components/Dialog";

type Props = {
	show: boolean;
	onConfirm: () => void;
	onClose: () => void;
};

export default function CardDeleteDialog({ show, onConfirm, onClose }: Props) {
	return (
		<BottomSheet show={show} onClose={onClose}>
			<DialogHeading>Delete card</DialogHeading>

			<DialogDescription>Are you sure you want to delete this card?</DialogDescription>
			<DialogDescription>This action cannot be undone.</DialogDescription>

			<DialogButtons>
				<Button title="Cancel" variant="flat" onPress={onClose} />
				<Button title="Confirm" theme="danger" onPress={onConfirm} />
			</DialogButtons>
		</BottomSheet>
	);
}
