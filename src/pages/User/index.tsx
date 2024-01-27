import { Fragment, ReactElement } from "react";

import {
	IconChevronRight,
	IconDatabase,
	IconMoonStars,
	IconPasswordFingerprint,
	TablerIconsProps
} from "@tabler/icons-react";

import { PageContainer } from "@components/Containers";
import { HeaderTitle } from "@components/Header/HeaderTitle.tsx";
import { TabBar } from "@components/TabBar";

export function User() {
	return (
		<Fragment>
			<HeaderTitle title="You" />

			<PageContainer>
				<div>
					<p className="pl-2 text-sm mb-2 text-th-white/60">App Settings</p>
					<div className="space-y-0.5">
						<SettingsButton Icon={IconPasswordFingerprint} title="Password" />
						<SettingsButton Icon={IconMoonStars} title="Display & UI" />
						<SettingsButton Icon={IconDatabase} title="Data" />
					</div>
				</div>
			</PageContainer>

			<TabBar />
		</Fragment>
	);
}

type SettingsButtonProps = {
	Icon: (props: TablerIconsProps) => ReactElement;
	title: string;
};

function SettingsButton({ Icon, title }: SettingsButtonProps) {
	return (
		<div className="flex items-center bg-th-white/5 px-3 py-2.5 rounded-sm first:rounded-t-xl last:rounded-b-xl text-th-white/80">
			<Icon size={20} className="mr-2" />
			<p>{title}</p>
			<IconChevronRight size={20} className="text-th-white/40 ml-auto" />
		</div>
	);
}
