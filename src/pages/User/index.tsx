import { Fragment, useState } from "react";

import { IconMoonStars, IconPasswordFingerprint, IconTrash } from "@tabler/icons-react";

import { DeleteDataDialog } from "@pages/User/DeleteDataDialog";
import { SettingsGroup } from "@pages/User/Settings";
import { SettingsButton, SettingsLink } from "@pages/User/Settings/Button.tsx";

import { PageContainer } from "@components/Containers";
import { HeaderTitle } from "@components/Header/HeaderTitle.tsx";
import { TabBar } from "@components/TabBar";

export function User() {
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
					<SettingsLink Icon={IconMoonStars} title="Appearance" to="appearance" />
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
