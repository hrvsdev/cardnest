import {
	BottomSheet,
	BottomSheetButtons,
	BottomSheetCancelButton,
	BottomSheetDescription,
	BottomSheetHeading,
	BottomSheetPrimaryButton
} from "@components/BottomSheet";

export function DeleteAccountBottomSheet() {
	return (
		<BottomSheet>
			<BottomSheetHeading>Delete account</BottomSheetHeading>

			<BottomSheetDescription>Are you sure you want to delete your account?</BottomSheetDescription>
			<BottomSheetDescription>
				Your all <b className="text-th-white">data will be permanently deleted</b>.
			</BottomSheetDescription>

			<BottomSheetDescription>You will have to sign in again to continue.</BottomSheetDescription>

			<BottomSheetButtons>
				<BottomSheetCancelButton />
				<BottomSheetPrimaryButton title="Continue" theme="danger" />
			</BottomSheetButtons>
		</BottomSheet>
	);
}
