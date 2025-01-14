import { NavLink } from "react-router-dom";

import { CreditCardIcon, HomeIcon, UserCircleIcon } from "@heroicons/react/24/solid";

import { c } from "@utils/styles.ts";

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
		<div className="flex justify-between sticky bottom-0 border-t-[0.5px] border-th-white/10 bg-th-black/80 backdrop-blur-md">
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
		<NavLink to={path} className={({ isActive }) => c("flex-1", isActive ? "text-th-sky" : "text-th-white/70")}>
			<I width={24} className={c("mx-auto py-4")} />
		</NavLink>
	);
}
