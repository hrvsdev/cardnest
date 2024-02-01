import { Fragment, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { IconMoonStars, IconPasswordFingerprint, IconTrash } from "@tabler/icons-react";
import { DeleteDataDialog } from "pages/User/components/DeleteDataDialog";
import { SettingsGroup } from "pages/User/components/Settings";

import { SettingsButton, SettingsLink } from "@pages/User/components/Settings/Button.tsx";
import { Security } from "@pages/User/Security";
import { UserInterface } from "@pages/User/UserInterface";

import { PageContainer } from "@components/Containers";
import { HeaderTitle } from "@components/Header/HeaderTitle.tsx";
import { TabBar } from "@components/TabBar";

export function User() {
	return (
		<Routes>
			<Route index element={<UserPage />} />
			<Route path="security/*" element={<Security />} />
			<Route path="interface/*" element={<UserInterface />} />
		</Routes>
	);
}

function UserPage() {
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);

	const deleteData = () => {
		console.log("Deleting data...");
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
				onConfirm={deleteData}
				onClose={() => setShowDeleteDialog(false)}
			/>
		</Fragment>
	);
}

const DELETE_DESCRIPTION =
	"Deleting data will forever delete all data from all your devices and there is no way to recover it.";
