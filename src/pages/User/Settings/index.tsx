import { ReactNode } from "react";

import { Show } from "@components/Show";

type SettingsGroupProp = {
	title?: string;
	description?: string;
	children: ReactNode;
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
