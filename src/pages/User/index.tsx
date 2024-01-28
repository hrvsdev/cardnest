import { Fragment, ReactElement, ReactNode } from "react";

import {
	IconChevronRight,
	IconMoonStars,
	IconPasswordFingerprint,
	IconTrash,
	TablerIconsProps
} from "@tabler/icons-react";

import { PageContainer } from "@components/Containers";
import { HeaderTitle } from "@components/Header/HeaderTitle.tsx";
import { Show } from "@components/Show";
import { TabBar } from "@components/TabBar";

export function User() {
	return (
		<Fragment>
			<HeaderTitle title="You" />

			<PageContainer className="space-y-6">
				<SettingsGroup title="App settings">
					<SettingsButton Icon={IconPasswordFingerprint} title="Security" />
					<SettingsButton Icon={IconMoonStars} title="Appearance" />
				</SettingsGroup>
				<SettingsGroup
					title="Danger zone"
					description="Deleting data will forever delete all data from all your devices and there is no way to recover it."
				>
					<SettingsButton Icon={IconTrash} title="Delete all data" />
				</SettingsGroup>
			</PageContainer>

			<TabBar />
		</Fragment>
	);
}

type SettingsGroupProp = {
	title?: string;
	description?: string;
	children: ReactNode;
};

function SettingsGroup({ title, description, children }: SettingsGroupProp) {
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

type SettingsButtonProps = {
	Icon: (props: TablerIconsProps) => ReactElement;
	title: string;
};

function SettingsButton({ Icon, title }: SettingsButtonProps) {
	return (
		<div className="flex items-center bg-th-white/5 px-3 py-2.5 rounded-sm first:rounded-t-xl last:rounded-b-xl">
			<Icon size={20} className="mr-2" />
			<p>{title}</p>
			<IconChevronRight size={20} className="text-th-white/40 ml-auto" />
		</div>
	);
}
