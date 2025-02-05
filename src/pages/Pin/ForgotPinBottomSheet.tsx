import {
	BottomSheet,
	BottomSheetButtons,
	BottomSheetDescription,
	BottomSheetHeading,
	BottomSheetPrimaryButton
} from "@components/BottomSheet";

type Props = {
	context: "UNLOCK" | "VERIFICATION";
	hasCreatedPassword: boolean;
};

export function ForgotPinBottomSheet({ context, hasCreatedPassword }: Props) {
	let desc: string = "";

	if (hasCreatedPassword) {
		if (context === "UNLOCK") desc = "You can always unlock with your password, or sign-out and sign-in again to create a new PIN.";
		else if (context === "VERIFICATION") desc = "However, you can sign-out and sign-in again to create a new PIN.";
	} else {
		desc = "However, you can start fresh by clearing site data, but doing so will delete all your data.";
	}

	return (
		<BottomSheet>
			<BottomSheetHeading>Forgot PIN</BottomSheetHeading>

			<BottomSheetDescription>It is never stored, so it can't be recovered.</BottomSheetDescription>
			<BottomSheetDescription>{desc}</BottomSheetDescription>

			<BottomSheetButtons>
				<BottomSheetPrimaryButton title="Okay" />
			</BottomSheetButtons>
		</BottomSheet>
	);
}
