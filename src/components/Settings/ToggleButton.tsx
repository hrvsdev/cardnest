import { ReactNode } from "react";

import { IconProps } from "@tabler/icons-react";

import { SettingsItemContent, SettingsItemWrapper } from "@components/Settings/Button.tsx";
import { Toggle } from "@components/Toggle";

type Props = {
	title: string;
	Icon: (props: IconProps) => ReactNode;
	checked: boolean;
	onChange: (checked: boolean) => void;
};

export function SettingsToggleButton({ Icon, title, checked, onChange }: Props) {
	return (
		<SettingsItemWrapper>
			<SettingsItemContent title={title} Icon={Icon} rightContent={<Toggle checked={checked} onChange={onChange} />} />
		</SettingsItemWrapper>
	);
}
