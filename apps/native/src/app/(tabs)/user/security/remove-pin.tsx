import { BottomSheet } from "@components/BottomSheet";
import { Button } from "@components/Button";
import { DialogButtons, DialogDescription, DialogHeading } from "@components/Dialog";

type Props = {
	show: boolean;
	onConfirm: () => void;
	onClose: () => void;
};

export default function RemovePinDialog({ show, onConfirm, onClose }: Props) {
	return (
		<BottomSheet show={show} onClose={onClose}>
			<DialogHeading>Remove app password</DialogHeading>

			<DialogDescription>Are you sure you want to remove the password?</DialogDescription>
			<DialogDescription>
				Anyone who has access to your device will be able to see your data.
			</DialogDescription>

			<DialogButtons>
				<Button title="Cancel" variant="flat" onPress={onClose} />
				<Button title="Confirm" theme="danger" onPress={onConfirm} />
			</DialogButtons>
		</BottomSheet>
	);
}
