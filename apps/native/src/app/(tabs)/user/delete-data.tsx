import { BottomSheet } from "@components/BottomSheet";
import { Button } from "@components/Button";
import { DialogButtons, DialogDescription, DialogHeading } from "@components/Dialog";

type Props = {
	show: boolean;
	onConfirm: () => void;
	onClose: () => void;
};

export default function DeleteDataDialog({ show, onConfirm, onClose }: Props) {
	return (
		<BottomSheet show={show} onClose={onClose}>
			<DialogHeading>Delete all data</DialogHeading>

			<DialogDescription>
				Are you sure you want to delete all your data from all your devices?
			</DialogDescription>
			<DialogDescription> This action cannot be undone.</DialogDescription>

			<DialogButtons>
				<Button title="Cancel" variant="flat" onPress={onClose} />
				<Button title="Confirm" theme="danger" onPress={onConfirm} />
			</DialogButtons>
		</BottomSheet>
	);
}
