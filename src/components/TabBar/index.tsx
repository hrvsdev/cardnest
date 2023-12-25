import { useState } from "react";

import { CreditCardIcon, HomeIcon, UserCircleIcon } from "@heroicons/react/24/solid";

import { c } from "@utils/styles.ts";





const tabs = [
	{
		icon: HomeIcon,
		label: "Home"
	},
	{
		icon: CreditCardIcon,
		label: "Cards"
	},
	{
		icon: UserCircleIcon,
		label: "You"
	}
];

export function TabBar() {
	const [current, setCurrent] = useState(0);
	return (
		<div className="flex justify-between sticky bottom-0 p-4 border-t border-th-white/10 bg-th-black/80 backdrop-blur-md">
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
	icon: typeof CreditCardIcon;
	label: string;
	isActive: boolean;
	onClick: () => void;
};

function TabButton({ icon: I, isActive, onClick }: TabButtonProps) {
	return (
		<button onClick={onClick} className="w-1/3">
			<div className="flex items-center justify-center gap-2.5 rounded-2xl mx-auto">
				<I
					width={24}
					className={c(
						"transition-colors duration-300",
						isActive ? "text-th-sky" : "text-th-white/70"
					)}
				/>
			</div>
		</button>
	);
}
