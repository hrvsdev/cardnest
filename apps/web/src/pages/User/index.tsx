import { Fragment, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { IconMoonStars, IconPasswordFingerprint, IconTrash } from "@tabler/icons-react";
import { SettingsGroup } from "components/Settings";

import { VerifyPinBeforeAction } from "@pages/Pin/VerifyPinBeforeAction";
import { DeleteDataDialog } from "@pages/User/components/DeleteDataDialog";
import { Security } from "@pages/User/Security";
import { UserInterface } from "@pages/User/UserInterface";

import { PageContainer } from "@components/Containers";
import { HeaderTitle } from "@components/Header/HeaderTitle.tsx";
import { SettingsButton, SettingsLink } from "@components/Settings/Button.tsx";
import { TabBar } from "@components/TabBar";

import { useSetAfterPinVerified } from "@libs/hooks/src/actions";
import { useIsAuthenticatedValue } from "@libs/hooks/src/auth";
import { useDeleteAllCards } from "@libs/hooks/src/card/data.ts";

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

	const isAuthenticated = useIsAuthenticatedValue();
	const deleteAllData = useDeleteAllCards();
	const setAfterPinVerified = useSetAfterPinVerified();

	const [showDeleteDialog, setShowDeleteDialog] = useState(false);

	const deleteData = () => {
		deleteAllData();
		navigate(location.pathname);
	};

	const onDeleteConfirmClick = () => {
		if (isAuthenticated) {
			setAfterPinVerified(() => deleteData);
			navigate("pin/verify");
		} else {
			deleteData();
		}
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
					<SettingsButton
						isDanger
						Icon={IconTrash}
						title="Delete all data"
						onClick={() => setShowDeleteDialog(true)}
					/>
				</SettingsGroup>
			</PageContainer>
			<TabBar />

			<DeleteDataDialog
				show={showDeleteDialog}
				onConfirm={onDeleteConfirmClick}
				onClose={() => setShowDeleteDialog(false)}
			/>
		</Fragment>
	);
}

const DELETE_DESCRIPTION =
	"Deleting data will forever delete all data from all your devices and there is no way to recover it.";
