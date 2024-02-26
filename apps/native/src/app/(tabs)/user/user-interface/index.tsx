import { useState } from "react";

import { SettingsGroup } from "components/Settings";
import { IconPassword } from "tabler-icons-react-native";

import { SubPageRoot } from "@components/Containers";
import { SettingsToggleButton } from "@components/Settings/ToggleButton.tsx";

export default function Page() {
	const [maskCard, setMaskCard] = useState(false);

	return (
		<SubPageRoot gap={24} title="User Interface" leftIconLabel="Settings">
			<SettingsGroup title="Card" description={MASK_CARD_DESC}>
				<SettingsToggleButton
					isFirst
					isLast
					title="Mask card number"
					Icon={IconPassword}
					checked={maskCard}
					onChange={setMaskCard}
				/>
			</SettingsGroup>
		</SubPageRoot>
	);
}

const MASK_CARD_DESC = "Mask the card number on the card preview on home screen page.";
