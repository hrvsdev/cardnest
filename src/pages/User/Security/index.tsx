import { Fragment } from "react";

import { IconLockOpenOff, IconPasswordMobilePhone } from "@tabler/icons-react";

import { SettingsGroup } from "@pages/User/components/Settings";
import { SettingsButton, SettingsLink } from "@pages/User/components/Settings/Button.tsx";

import { PageContainer } from "@components/Containers";
import { SubPageHeader } from "@components/Header/SubPageHeader.tsx";

export function Security() {
	return (
		<Fragment>
			<SubPageHeader title="Security" leftIconLabel="Settings" />
			<PageContainer className="space-y-6">
				<SettingsGroup title="Password">
					<SettingsButton
						onClick={() => {}}
						Icon={IconPasswordMobilePhone}
						title="Change password"
					/>
				</SettingsGroup>
				<SettingsGroup title="Danger zone" description={DESC}>
					<SettingsLink
						isDanger
						to="#"
						Icon={IconLockOpenOff}
						title="Remove app password"
					/>
				</SettingsGroup>
			</PageContainer>
		</Fragment>
	);
}

const DESC =
	"Removing your app password will make all your data accessible to anyone who has access to your device.";
