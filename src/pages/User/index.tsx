import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";

import { IconDatabase, IconDownload, IconInfoCircle, IconMoonStars, IconPasswordFingerprint, IconUserCircle } from "@tabler/icons-react";
import { SettingsGroup } from "components/Settings";

import { Account } from "@pages/User/Account";
import { About } from "@pages/User/AppInfo";
import { DataManagement } from "@pages/User/DataManagement";
import { Security } from "@pages/User/Security";
import { UserInterface } from "@pages/User/UserInterface";

import { PageContainer } from "@components/Containers";
import { HeaderTitle } from "@components/Header/HeaderTitle.tsx";
import { SettingsLink } from "@components/Settings/Button.tsx";
import { TabBar } from "@components/TabBar";

import { VERSION_NAME } from "@utils/app.ts";

export function User() {
	return (
		<Routes>
			<Route index element={<UserPage />} />

			<Route path="account/*" element={<Account />} />
			<Route path="security/*" element={<Security />} />
			<Route path="interface/*" element={<UserInterface />} />
			<Route path="data-management/*" element={<DataManagement />} />
			<Route path="about/*" element={<About />} />
		</Routes>
	);
}

function UserPage() {
	return (
		<Fragment>
			<HeaderTitle title="You" />

			<PageContainer className="space-y-6">
				<SettingsGroup title="User Profile">
					<SettingsLink Icon={IconUserCircle} title="Account" to="account" />
				</SettingsGroup>

				<SettingsGroup title="App settings">
					<SettingsLink Icon={IconPasswordFingerprint} title="Security" to="security" />
					<SettingsLink Icon={IconMoonStars} title="User Interface" to="interface" />
				</SettingsGroup>

				<SettingsGroup title="Data">
					<SettingsLink Icon={IconDatabase} title="Data Management" to="data-management" />
				</SettingsGroup>

				<SettingsGroup title="App info">
					<SettingsLink
						Icon={IconDownload}
						title="Download app"
						to={`https://github.com/hrvsdev/cardnest-native/releases/download/v${VERSION_NAME}/CardNest-v${VERSION_NAME}.apk`}
					/>
					<SettingsLink Icon={IconInfoCircle} title="About CardNest" to="about" />
				</SettingsGroup>
			</PageContainer>

			<TabBar />
		</Fragment>
	);
}
