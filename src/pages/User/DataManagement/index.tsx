import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { IconTrash } from "@tabler/icons-react";

import { VerifyPassword } from "@pages/Password/Verify";
import { VerifyPinBeforeAction } from "pages/Pin/Verify";
import { DeleteDataBottomSheet } from "@pages/User/DataManagement/DeleteDataBottomSheet.tsx";

import { openBottomSheet } from "@components/BottomSheet/state.ts";
import { SubPageRoot } from "@components/Containers";
import { SettingsGroup } from "@components/Settings";
import { SettingsButton } from "@components/Settings/Button.tsx";
import { Toast } from "@components/Toast/state.ts";

import { afterPasswordVerified, afterPinVerified } from "@data/actions";
import { useHasCreatedPassword, useHasCreatedPin } from "@data/auth";
import { deleteAllCards } from "@data/card";

export function DataManagement() {
	return (
		<Routes>
			<Route index element={<DataManagementPage />} />
			<Route path="password/verify" element={<VerifyPassword />} />
			<Route path="pin/verify" element={<VerifyPinBeforeAction />} />
		</Routes>
	);
}

function DataManagementPage() {
	const navigate = useNavigate();
	const location = useLocation();

	const hasCreatedPassword = useHasCreatedPassword();
	const hasCreatedPin = useHasCreatedPin();

	const _deleteAllCards = async () => {
		await deleteAllCards();
		navigate(location.pathname);
		Toast.success("Deleted all cards");
	};

	const onDeleteAllCards = () => {
		openBottomSheet(<DeleteDataBottomSheet />, async () => {
			if (hasCreatedPassword) {
				afterPasswordVerified.set(_deleteAllCards);
				navigate("password/verify");
			} else if (hasCreatedPin) {
				afterPinVerified.set(_deleteAllCards);
				navigate("pin/verify");
			} else {
				await _deleteAllCards();
			}
		});
	};

	return (
		<SubPageRoot title="Data Management" backLabel="Settings" className="space-y-6">
			<SettingsGroup title="Danger Zone" description={DELETE_CARDS_DESC}>
				<SettingsButton Icon={IconTrash} title="Delete all cards" isDanger={true} onClick={onDeleteAllCards} />
			</SettingsGroup>
		</SubPageRoot>
	);
}

const DELETE_CARDS_DESC = "Delete to remove your cards data from this device and the server forever.";
