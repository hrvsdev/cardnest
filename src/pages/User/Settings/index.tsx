import { ReactElement, ReactNode } from "react";

import { IconChevronRight, TablerIconsProps } from "@tabler/icons-react";

import { Show } from "@components/Show";

import { c } from "@utils/styles.ts";

type SettingsGroupProp = {
	title?: string;
	description?: string;
	children: ReactNode;
};

type SettingsButtonProps = {
	Icon: (props: TablerIconsProps) => ReactElement;
	title: string;
	isDanger?: boolean;
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

export function SettingsButton({ Icon, title, isDanger }: SettingsButtonProps) {
	return (
		<div
			className={c(
				"flex items-center px-3 py-2.5 rounded-sm first:rounded-t-xl last:rounded-b-xl",
				isDanger ? "bg-th-red/10 text-th-red" : "bg-th-white/5"
			)}
		>
			<Icon size={20} className="mr-2" />
			<p>{title}</p>
			<IconChevronRight
				size={20}
				className={c("ml-auto", isDanger ? "text-th-red/50" : "text-th-white/40")}
			/>
		</div>
	);
}
