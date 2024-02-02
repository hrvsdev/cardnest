import { Fragment } from "react";

import { IconPassword } from "@tabler/icons-react";

import { SettingsGroup } from "@pages/User/components/Settings";
import { SettingsToggleButton } from "@pages/User/components/Settings/ToggleButton.tsx";

import { PageContainer } from "@components/Containers";
import { SubPageHeader } from "@components/Header/SubPageHeader.tsx";

import { useMaskCardNumber } from "@hooks/preferences";

export function UserInterface() {
	const [maskCard, setMaskCard] = useMaskCardNumber();

	return (
		<Fragment>
			<SubPageHeader title="User Interface" leftIconLabel="Settings" />
			<PageContainer className="space-y-6">
				<SettingsGroup title="Card" description={MASK_CARD_DESC}>
					<SettingsToggleButton
						title="Mask card number"
						Icon={IconPassword}
						checked={maskCard}
						onChange={setMaskCard}
					/>
				</SettingsGroup>
			</PageContainer>
		</Fragment>
	);
}

const MASK_CARD_DESC = "Mask the card number on the card preview on home screen page.";
