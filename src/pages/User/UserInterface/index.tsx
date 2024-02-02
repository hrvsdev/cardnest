import { Fragment } from "react";

import { IconCopy } from "@tabler/icons-react";

import { SettingsGroup } from "@pages/User/components/Settings";
import { SettingsToggleButton } from "@pages/User/components/Settings/ToggleButton.tsx";

import { PageContainer } from "@components/Containers";
import { SubPageHeader } from "@components/Header/SubPageHeader.tsx";

export function UserInterface() {
	return (
		<Fragment>
			<SubPageHeader title="User Interface" leftIconLabel="Settings" />
			<PageContainer className="space-y-6">
				<SettingsGroup>
					<SettingsToggleButton
						title="Copy on Card Preview"
						Icon={IconCopy}
						checked={false}
						onChange={() => {}}
					/>
				</SettingsGroup>
			</PageContainer>
		</Fragment>
	);
}
