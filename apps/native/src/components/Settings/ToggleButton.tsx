import { ReactElement } from "react";

import { TablerIconsProps } from "@tabler/icons-react";

type Props = {
	Icon: (props: TablerIconsProps) => ReactElement;
	title: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
};

// @ts-ignore
export function SettingsToggleButton({ Icon, title, checked, onChange }: Props) {
	return null;
}
