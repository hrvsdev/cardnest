import {
	BottomSheet,
	BottomSheetButtons,
	BottomSheetCancelButton,
	BottomSheetDescription,
	BottomSheetHeading,
	BottomSheetPrimaryButton
} from "@components/BottomSheet";

export function SignOutBottomSheet() {
	return (
		<BottomSheet>
			<BottomSheetHeading>Sign out</BottomSheetHeading>

			<BottomSheetDescription>Are you sure you want to sign-out?</BottomSheetDescription>
			<BottomSheetDescription>Your data including cards, password and PIN will be removed from this device.</BottomSheetDescription>

			<BottomSheetButtons>
				<BottomSheetCancelButton />
				<BottomSheetPrimaryButton title="Confirm" theme="danger" />
			</BottomSheetButtons>
		</BottomSheet>
	);
}
