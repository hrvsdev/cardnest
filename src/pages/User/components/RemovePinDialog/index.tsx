import {
	BottomSheet,
	BottomSheetButtons,
	BottomSheetCancelButton,
	BottomSheetDescription,
	BottomSheetHeading,
	BottomSheetPrimaryButton
} from "@components/BottomSheet";
import { Else, Show } from "@components/Show";

export function RemovePinBottomSheet({ hasCreatedPassword }: { hasCreatedPassword: boolean }) {
	return (
		<BottomSheet>
			<BottomSheetHeading>Remove PIN</BottomSheetHeading>

			<BottomSheetDescription>Are you sure you want to remove your PIN?</BottomSheetDescription>
			<BottomSheetDescription>
				<Show when={hasCreatedPassword}>
					If you remove the PIN, you will need to <b className="text-th-white">use your password </b> to unlock the app..
					<Else>
						It will <b className="text-th-white">reduce security</b> and make your data accessible to anyone with your device.
					</Else>
				</Show>
			</BottomSheetDescription>

			<BottomSheetButtons>
				<BottomSheetCancelButton />
				<BottomSheetPrimaryButton title="Confirm" theme="danger" />
			</BottomSheetButtons>
		</BottomSheet>
	);
}
