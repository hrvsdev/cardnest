import { ReactElement } from "react";

import { TablerIconsProps } from "@tabler/icons-react";
import { Toggle } from "components/Toggle";

type Props = {
	Icon: (props: TablerIconsProps) => ReactElement;
	title: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
};

export function SettingsToggleButton({ Icon, title, checked, onChange }: Props) {
	return (
		<div className="flex items-center w-full rounded-sm first:rounded-t-xl last:rounded-b-xl bg-th-white/5">
			<div className="flex items-center justify-between w-full h-11 px-3">
				<span className="flex items-center gap-2">
					<Icon size={20} />
					<p>{title}</p>
				</span>
				<Toggle checked={checked} onChange={onChange}/>
			</div>
		</div>
	);
}
