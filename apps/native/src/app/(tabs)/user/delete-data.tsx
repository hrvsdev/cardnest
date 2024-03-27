import { router } from "expo-router";

import { BottomSheet } from "@components/BottomSheet";
import { Button } from "@components/Button";
import { DialogButtons, DialogDescription, DialogHeading } from "@components/Dialog";

export default function PinCreateDialog() {
	return (
		<BottomSheet show={false} onClose={() => router.back()}>
			<DialogHeading>Delete all data</DialogHeading>

			<DialogDescription>
				Are you sure you wan9t to delete all your data from all your devices?
			</DialogDescription>
			<DialogDescription> This action cannot be undone.</DialogDescription>

			<DialogButtons>
				<Button title="Cancel" variant="flat" onPress={() => {}} />
				<Button title="Confirm" theme="danger" onPress={() => {}} />
			</DialogButtons>
		</BottomSheet>
	);
}
