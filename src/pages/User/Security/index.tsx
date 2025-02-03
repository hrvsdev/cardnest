import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { IconLockOff, IconPasswordMobilePhone } from "@tabler/icons-react";
import { SettingsGroup } from "components/Settings";

import { CreatePin } from "@pages/CreatePin";
import { VerifyPinBeforeAction } from "@pages/Pin/VerifyPinBeforeAction";
import { RemovePinBottomSheet } from "@pages/User/components/RemovePinDialog";

import { openBottomSheet } from "@components/BottomSheet/state.ts";
import { SubPageRoot } from "@components/Containers";
import { SettingsButton } from "@components/Settings/Button.tsx";
import { Show } from "@components/Show";

import { afterPinCreated, afterPinVerified } from "@data/actions";
import { removePin, useHasCreatedPassword, useHasCreatedPin } from "@data/auth";
import { decryptCards, encryptCards } from "@data/card";

export function Security() {
	return (
		<Routes>
			<Route index element={<SecurityPage />} />
			<Route path="pin/verify" element={<VerifyPinBeforeAction />} />
			<Route path="pin/create/*" element={<CreatePin />} />
		</Routes>
	);
}

function SecurityPage() {
	const navigate = useNavigate();
	const location = useLocation();

	const hasCreatedPassword = useHasCreatedPassword();
	const hasCreatedPin = useHasCreatedPin();

	const onCreatePin = () => {
		navigate("pin/create");
		afterPinCreated.set(async () => {
			if (!hasCreatedPassword && !hasCreatedPin) await encryptCards();
			navigate(location.pathname);
		});
	};

	const onChangePin = () => {
		navigate("pin/verify");
		afterPinVerified.set(async () => {
			onCreatePin();
		});
	};

	const onRemovePin = () => {
		openBottomSheet(<RemovePinBottomSheet />, () => {
			navigate("pin/verify");
			afterPinVerified.set(async () => {
				await removePin();
				if (!hasCreatedPassword) await decryptCards();
				navigate(location.pathname);
			});
		});
	};

	return (
		<SubPageRoot title="Security" backLabel="Settings" className="space-y-6">
			<SettingsGroup title="PIN" description={hasCreatedPin ? undefined : CREATE_PIN_DESC_IF_NONE_EXIST}>
				<SettingsButton
					title={hasCreatedPin ? "Change PIN" : "Create PIN"}
					onClick={hasCreatedPin ? onChangePin : onCreatePin}
					Icon={IconPasswordMobilePhone}
				/>

				<Show when={hasCreatedPin}>
					<SettingsButton title="Remove PIN" onClick={onRemovePin} Icon={IconLockOff} />
				</Show>
			</SettingsGroup>
		</SubPageRoot>
	);
}

const CREATE_PIN_DESC_IF_NONE_EXIST = "Create a PIN to encrypt your data to ensure privacy and security.";
