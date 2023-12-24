import { ReactElement, useState } from "react";

import {
	IconCreditCard,
	IconSmartHome,
	IconUserCircle,
	TablerIconsProps
} from "@tabler/icons-react";

import { Show } from "@components/Show";

import { c } from "@utils/styles.ts";

const tabs = [
	{
		icon: IconSmartHome,
		label: "Home"
	},
	{
		icon: IconCreditCard,
		label: "Cards"
	},
	{
		icon: IconUserCircle,
		label: "You"
	}
];

export function TabBar() {
	const [current, setCurrent] = useState(0);
	return (
		<div className="flex justify-between bg-th-green w-full px-4 pt-4 pb-3.5 rounded-t-3xl">
			{tabs.map((tab, index) => (
				<TabButton
					key={tab.label}
					icon={tab.icon}
					label={tab.label}
					isActive={index === current}
					onClick={() => setCurrent(index)}
				/>
			))}
		</div>
	);
}

type TabButtonProps = {
	icon: (props: TablerIconsProps) => ReactElement;
	label: string;
	isActive: boolean;
	onClick: () => void;
};

function TabButton({ icon: I, label, isActive, onClick }: TabButtonProps) {
	return (
		<button onClick={onClick} className="w-1/3">
			<div
				className={c(
					"flex items-center justify-center w-full h-10 gap-2.5 rounded-2xl mx-auto",
					isActive ? "bg-th-dark-blue text-th-green" : "text-th-dark-blue"
				)}
			>
				<I size={26} />
				<Show when={isActive}>
					<span>{label}</span>
				</Show>
			</div>
		</button>
	);
}
