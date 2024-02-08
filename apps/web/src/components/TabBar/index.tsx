import { NavLink } from "react-router-dom";

import { CreditCardIcon, HomeIcon, UserCircleIcon } from "@heroicons/react/24/solid";

import { c } from "@libs/utils/src/styles.ts";

const tabs = [
	{
		icon: HomeIcon,
		label: "Home",
		path: "/home"
	},
	{
		icon: CreditCardIcon,
		label: "Add Card",
		path: "/add"
	},
	{
		icon: UserCircleIcon,
		label: "You",
		path: "/user"
	}
];

export function TabBar() {
	return (
		<div className="flex justify-between sticky bottom-0 border-t border-th-white/10 bg-th-black/80 backdrop-blur-md">
			{tabs.map((tab) => (
				<TabButton key={tab.label} icon={tab.icon} label={tab.label} path={tab.path} />
			))}
		</div>
	);
}

type TabButtonProps = {
	icon: typeof CreditCardIcon;
	label: string;
	path: string;
};

function TabButton({ icon: I, path }: TabButtonProps) {
	return (
		<NavLink
			to={path}
			className={({ isActive }) => c("flex-1", isActive ? "text-th-sky" : "text-th-white/70")}
		>
			<div className="flex items-center justify-center py-4 gap-2.5 rounded-2xl mx-auto">
				<I width={24} className={c("transition-colors duration-300")} />
			</div>
		</NavLink>
	);
}
