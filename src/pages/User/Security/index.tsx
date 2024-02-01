import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";

import { IconLockOpenOff, IconPasswordMobilePhone } from "@tabler/icons-react";

import { CreatePin } from "@pages/CreatePin";
import { SettingsGroup } from "@pages/User/components/Settings";
import { SettingsLink } from "@pages/User/components/Settings/Button.tsx";

import { PageContainer } from "@components/Containers";
import { SubPageHeader } from "@components/Header/SubPageHeader.tsx";

export function Security() {
	return (
		<Routes>
			<Route index element={<SecurityPage />} />
			<Route path="pin/create/*" element={<CreatePin />} />
		</Routes>
	);
}

function SecurityPage() {
	return (
		<Fragment>
			<SubPageHeader title="Security" leftIconLabel="Settings" />
			<PageContainer className="space-y-6">
				<SettingsGroup title="Password">
					<SettingsLink to="pin/create" Icon={IconPasswordMobilePhone} title="Change password" />
				</SettingsGroup>
				<SettingsGroup title="Danger zone" description={DESC}>
					<SettingsLink isDanger to="#" Icon={IconLockOpenOff} title="Remove app password" />
				</SettingsGroup>
			</PageContainer>
		</Fragment>
	);
}

const DESC =
	"Removing your app password will make all your data accessible to anyone who has access to your device.";
