import { IconBrandGithub, IconInfoCircle } from "@tabler/icons-react";

import { SubPageRoot } from "@components/Containers";
import { SettingsGroup } from "@components/Settings";
import { SettingsItemContent, SettingsItemWrapper, SettingsLink } from "@components/Settings/Button.tsx";

import { VERSION_NAME } from "@utils/app.ts";

export function About() {
	return (
		<SubPageRoot title="About" backLabel="Settings" className="space-y-6">
			<SettingsGroup title="About App">
				<SettingsItemWrapper>
					<SettingsItemContent Icon={IconInfoCircle} title={`CardNest v${VERSION_NAME}`} />
				</SettingsItemWrapper>
				<SettingsLink Icon={IconBrandGithub} title="Source code" to="https://github.com/hrvsdev/cardnest" isExternalLink={true} />
			</SettingsGroup>
		</SubPageRoot>
	);
}
