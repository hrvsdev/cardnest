import { router } from "expo-router";

import { BottomSheet } from "@components/BottomSheet";
import { Button } from "@components/Button";
import { DialogButtons, DialogDescription, DialogHeading } from "@components/Dialog";

export default function CardDeleteDialog() {
	return (
		<BottomSheet show={true} onPress={() => router.back()}>
			<DialogHeading>Delete card</DialogHeading>

			<DialogDescription>Are you sure you want to delete this card?</DialogDescription>
			<DialogDescription>This action cannot be undone.</DialogDescription>

			<DialogButtons>
				<Button title="Cancel" variant="flat" onPress={() => {}} />
				<Button title="Confirm" theme="danger" onPress={() => {}} />
			</DialogButtons>
		</BottomSheet>
	);
}
