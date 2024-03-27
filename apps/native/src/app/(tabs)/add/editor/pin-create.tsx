import { router } from "expo-router";

import { BottomSheet } from "@components/BottomSheet";
import { Button } from "@components/Button";
import { DialogButtons, DialogDescription, DialogHeading } from "@components/Dialog";

export default function PinCreateDialog() {
	return (
		<BottomSheet show={true} onPress={() => router.back()}>
			<DialogHeading>Create a PIN</DialogHeading>

			<DialogDescription>
				It is recommended that you create a PIN to secure your cards so that they can't be accessed
				by anyone else.
			</DialogDescription>
			<DialogDescription>You can also skip this and create later.</DialogDescription>

			<DialogButtons>
				<Button title="Skip" variant="flat" onPress={() => {}} />
				<Button title="Create PIN" theme="danger" onPress={() => {}} />
			</DialogButtons>
		</BottomSheet>
	);
}
