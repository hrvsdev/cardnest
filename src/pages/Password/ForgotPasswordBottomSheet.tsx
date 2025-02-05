import {
	BottomSheet,
	BottomSheetButtons,
	BottomSheetDescription,
	BottomSheetHeading,
	BottomSheetPrimaryButton
} from "@components/BottomSheet";

type Props = {
	context: "SIGN_IN" | "UNLOCK" | "VERIFICATION" | "CHANGE";
	hasCreatedPin: boolean;
};

export function ForgotPasswordBottomSheet({ context, hasCreatedPin }: Props) {
	let desc: string;

	switch (context) {
		case "SIGN_IN":
			desc = "You can try signing in again, or start fresh by creating a new account.";
			break;
		case "UNLOCK":
			if (hasCreatedPin) desc = "You can try unlocking with your PIN, or sign-out and start fresh by creating a new account.";
			else desc = "However, you can sign-out and start fresh by creating a new account.";
			break;
		case "VERIFICATION":
		case "CHANGE":
			desc = "However, you can start fresh by deleting this account and creating a new one.";
			break;
	}

	return (
		<BottomSheet>
			<BottomSheetHeading>Forgot password</BottomSheetHeading>

			<BottomSheetDescription>It is never stored, so it can't be recovered.</BottomSheetDescription>
			<BottomSheetDescription>{desc}</BottomSheetDescription>

			<BottomSheetButtons>
				<BottomSheetPrimaryButton title="Okay" />
			</BottomSheetButtons>
		</BottomSheet>
	);
}
