import { Fragment } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { IconMoonStars, IconPasswordFingerprint, IconTrash } from "@tabler/icons-react";
import { SettingsGroup } from "components/Settings";
import { DeleteDataBottomSheet } from "pages/User/components/DeleteDataDialog";

import { VerifyPinBeforeAction } from "@pages/Pin/VerifyPinBeforeAction";
import { Security } from "@pages/User/Security";
import { UserInterface } from "@pages/User/UserInterface";

import { openBottomSheet } from "@components/BottomSheet/state.ts";
import { PageContainer } from "@components/Containers";
import { HeaderTitle } from "@components/Header/HeaderTitle.tsx";
import { SettingsButton, SettingsLink } from "@components/Settings/Button.tsx";
import { TabBar } from "@components/TabBar";

import { afterPinVerified } from "@data/actions";
import { isAuthenticated } from "@data/auth";
import { deleteAllCards } from "@data/card";

export function User() {
	return (
		<Routes>
			<Route index element={<UserPage />} />
			<Route path="security/*" element={<Security />} />
			<Route path="interface/*" element={<UserInterface />} />

			<Route path="pin/verify" element={<VerifyPinBeforeAction />} />
		</Routes>
	);
}

function UserPage() {
	const navigate = useNavigate();
	const location = useLocation();

	const _deleteAllCards = async () => {
		deleteAllCards();
		navigate(location.pathname);
	};

	const onDeleteAllCards = () => {
		openBottomSheet(<DeleteDataBottomSheet />, async () => {
			if (isAuthenticated) {
				afterPinVerified.set(_deleteAllCards);
				navigate("pin/verify");
			} else {
				await _deleteAllCards();
			}
		});
	};

	return (
		<Fragment>
			<HeaderTitle title="You" />

			<PageContainer className="space-y-6">
				<SettingsGroup title="App settings">
					<SettingsLink Icon={IconPasswordFingerprint} title="Security" to="security" />
					<SettingsLink Icon={IconMoonStars} title="User Interface" to="interface" />
				</SettingsGroup>
				<SettingsGroup title="Danger zone" description={DELETE_DESCRIPTION}>
					<SettingsButton isDanger Icon={IconTrash} title="Delete all data" onClick={onDeleteAllCards} />
				</SettingsGroup>
			</PageContainer>
			<TabBar />
		</Fragment>
	);
}

const DELETE_DESCRIPTION = "Deleting data will forever delete all data from all your devices and there is no way to recover it.";
