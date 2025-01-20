import { ReactNode } from "react";

import { Show } from "@components/Show";

type Props = {
	title?: string;
	description?: string;
	children: ReactNode;
};

export function SettingsGroup({ title, description, children }: Props) {
	return (
		<div>
			<Show when={title}>
				<p className="pb-2 pl-2 text-th-white/60 text-xs uppercase">{title}</p>
			</Show>
			<div className="space-y-0.5">{children}</div>
			<Show when={description}>
				<p className="pt-2 pl-2 text-th-white/60 text-sm">{description}</p>
			</Show>
		</div>
	);
}
