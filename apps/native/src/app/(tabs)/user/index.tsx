import { IconMoonStars, IconPasswordFingerprint, IconTrash } from "tabler-icons-react-native";

import { PageContainer, TabPageRoot } from "@components/Containers";
import { HeaderTitle } from "@components/Header/HeaderTitle.tsx";
import { SettingsGroup } from "@components/Settings";
import { SettingsButton, SettingsLink } from "@components/Settings/Button.tsx";

export default function Page() {
	return (
		<TabPageRoot>
			<HeaderTitle title="You" />
			<PageContainer style={{ gap: 24 }}>
				<SettingsGroup title="App settings">
					<SettingsLink
						isFirst
						Icon={IconPasswordFingerprint}
						title="Security"
						href="/user/security"
					/>
					<SettingsLink
						isLast
						Icon={IconMoonStars}
						title="User Interface"
						href="/user/user-interface"
					/>
				</SettingsGroup>
				<SettingsGroup title="Danger zone" description={DELETE_DESCRIPTION}>
					<SettingsButton
						isFirst
						isLast
						isDanger
						Icon={IconTrash}
						title="Delete all data"
						onPress={() => console.log("Delete all data")}
					/>
				</SettingsGroup>
			</PageContainer>
		</TabPageRoot>
	);
}

const DELETE_DESCRIPTION =
	"Deleting data will forever delete all data from all your devices and there is no way to recover it.";
