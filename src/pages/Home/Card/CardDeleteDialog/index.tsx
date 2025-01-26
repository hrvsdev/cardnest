import {
	BottomSheet,
	BottomSheetButtons,
	BottomSheetCancelButton,
	BottomSheetDescription,
	BottomSheetHeading,
	BottomSheetPrimaryButton
} from "@components/BottomSheet";

export function DeleteCardBottomSheet() {
	return (
		<BottomSheet>
			<BottomSheetHeading>Delete card</BottomSheetHeading>

			<BottomSheetDescription>Are you sure you want to delete this card?</BottomSheetDescription>
			<BottomSheetDescription>This action cannot be undone.</BottomSheetDescription>

			<BottomSheetButtons>
				<BottomSheetCancelButton />
				<BottomSheetPrimaryButton title="Delete" theme="danger" />
			</BottomSheetButtons>
		</BottomSheet>
	);
}
