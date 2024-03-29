import { BottomSheet } from "@components/BottomSheet";
import { Button } from "@components/Button";
import { DialogButtons, DialogDescription, DialogHeading } from "@components/Dialog";

type Props = {
	show: boolean;
	onConfirm: () => void;
	onClose: () => void;
	onSkip: () => void;
};

export default function PinCreateDialog({ show, onConfirm, onClose, onSkip }: Props) {
	return (
		<BottomSheet show={show} onClose={onClose}>
			<DialogHeading>Create a PIN</DialogHeading>

			<DialogDescription>
				It is recommended that you create a PIN to secure your cards so that they can't be accessed
				by anyone else.
			</DialogDescription>
			<DialogDescription>You can also skip this and create later.</DialogDescription>

			<DialogButtons>
				<Button title="Skip" variant="flat" onPress={onSkip} />
				<Button title="Create PIN" theme="danger" onPress={onConfirm} />
			</DialogButtons>
		</BottomSheet>
	);
}
