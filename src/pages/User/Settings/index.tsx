import { ReactElement, ReactNode } from "react";

import { IconChevronRight, TablerIconsProps } from "@tabler/icons-react";

import { Show } from "@components/Show";

type SettingsGroupProp = {
	title?: string;
	description?: string;
	children: ReactNode;
};

type SettingsButtonProps = {
	Icon: (props: TablerIconsProps) => ReactElement;
	title: string;
};

export function SettingsGroup({ title, description, children }: SettingsGroupProp) {
	return (
		<div>
			<Show when={title}>
				<p className="pl-2 mb-2 text-th-white/60 text-xs uppercase">{title}</p>
			</Show>
			<div className="space-y-0.5">{children}</div>
			<Show when={description}>
				<p className="pl-2 text-sm mt-2 text-th-white/60">{description}</p>
			</Show>
		</div>
	);
}

export function SettingsButton({ Icon, title }: SettingsButtonProps) {
	return (
		<div className="flex items-center bg-th-white/5 px-3 py-2.5 rounded-sm first:rounded-t-xl last:rounded-b-xl">
			<Icon size={20} className="mr-2" />
			<p>{title}</p>
			<IconChevronRight size={20} className="text-th-white/40 ml-auto" />
		</div>
	);
}
