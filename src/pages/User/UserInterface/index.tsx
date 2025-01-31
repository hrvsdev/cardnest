import { Fragment } from "react";

import { IconPassword } from "@tabler/icons-react";
import { SettingsGroup } from "components/Settings";

import { PageContainer } from "@components/Containers";
import { SubPageHeader } from "@components/Header/SubPageHeader.tsx";
import { SettingsToggleButton } from "@components/Settings/ToggleButton.tsx";

import { useMaskCardNumber } from "@data/preferences";
import { setMaskCardNumber } from "@data/preferences/core.ts";

export function UserInterface() {
	const maskCardNumber = useMaskCardNumber();

	return (
		<Fragment>
			<SubPageHeader title="User Interface" backLabel="Settings" />
			<PageContainer className="space-y-6">
				<SettingsGroup title="Card" description={MASK_CARD_DESC}>
					<SettingsToggleButton title="Mask card number" Icon={IconPassword} checked={maskCardNumber} onChange={setMaskCardNumber} />
				</SettingsGroup>
			</PageContainer>
		</Fragment>
	);
}

const MASK_CARD_DESC = "Mask the card number on the card preview on home screen page.";
