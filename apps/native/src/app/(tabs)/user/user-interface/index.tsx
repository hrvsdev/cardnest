import { SettingsGroup } from "components/Settings";
import { IconPassword } from "tabler-icons-react-native";

import { PageContainer, PageRoot } from "@components/Containers";
import { SubPageHeader } from "@components/Header/SubPageHeader.tsx";
import { SettingsToggleButton } from "@components/Settings/ToggleButton.tsx";

export default function Page() {
  const [maskCard, setMaskCard] = [false, () => {}];

  return (
    <PageRoot>
      <SubPageHeader title="User Interface" leftIconLabel="Settings" />
      <PageContainer style={{ gap: 24 }}>
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
      </PageContainer>
    </PageRoot>
  );
}

const MASK_CARD_DESC =
  "Mask the card number on the card preview on home screen page.";
