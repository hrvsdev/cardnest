import { Fragment } from "react";

import { IconMoonStars, IconPasswordFingerprint, IconTrash } from "@tabler/icons-react";

import { SettingsButton, SettingsGroup } from "@pages/User/Settings";

import { PageContainer } from "@components/Containers";
import { HeaderTitle } from "@components/Header/HeaderTitle.tsx";
import { TabBar } from "@components/TabBar";

export function User() {
	return (
		<Fragment>
			<HeaderTitle title="You" />

			<PageContainer className="space-y-6">
				<SettingsGroup title="App settings">
					<SettingsButton Icon={IconPasswordFingerprint} title="Security" />
					<SettingsButton Icon={IconMoonStars} title="Appearance" />
				</SettingsGroup>
				<SettingsGroup
					title="Danger zone"
					description="Deleting data will forever delete all data from all your devices and there is no way to recover it."
				>
					<SettingsButton Icon={IconTrash} title="Delete all data" isDanger />
				</SettingsGroup>
			</PageContainer>

			<TabBar />
		</Fragment>
	);
}
