import {
	BottomSheet,
	BottomSheetButtons,
	BottomSheetCancelButton,
	BottomSheetDescription,
	BottomSheetHeading,
	BottomSheetPrimaryButton
} from "@components/BottomSheet";

export function DeleteDataBottomSheet() {
	return (
		<BottomSheet>
			<BottomSheetHeading>Delete all cards</BottomSheetHeading>

			<BottomSheetDescription>Are you sure you want to delete all your cards?</BottomSheetDescription>
			<BottomSheetDescription>
				Your all <span className="font-bold text-th-white">cards data will be permanently deleted</span> from all your devices.
			</BottomSheetDescription>

			<BottomSheetButtons>
				<BottomSheetCancelButton />
				<BottomSheetPrimaryButton title="Confirm" theme="danger" />
			</BottomSheetButtons>
		</BottomSheet>
	);
}
