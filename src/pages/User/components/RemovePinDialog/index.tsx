import {
	BottomSheet,
	BottomSheetButtons,
	BottomSheetCancelButton,
	BottomSheetDescription,
	BottomSheetHeading,
	BottomSheetPrimaryButton
} from "@components/BottomSheet";

export function RemovePinBottomSheet() {
	return (
		<BottomSheet>
			<BottomSheetHeading>Remove PIN</BottomSheetHeading>

			<BottomSheetDescription>Are you sure you want to remove your PIN?</BottomSheetDescription>
			<BottomSheetDescription>
				It will <b className="text-th-white">reduce security</b> and make your data accessible to anyone with your device.
			</BottomSheetDescription>

			<BottomSheetButtons>
				<BottomSheetCancelButton />
				<BottomSheetPrimaryButton title="Confirm" theme="danger" />
			</BottomSheetButtons>
		</BottomSheet>
	);
}
