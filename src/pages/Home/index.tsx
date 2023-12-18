import { ReactElement, useState } from "react";
import {
	IconCreditCard,
	IconSmartHome,
	IconUserCircle,
	TablerIconsProps
} from "@tabler/icons-react";
import { c } from "../../utils/styles.ts";
import Show from "../../components/Show.tsx";

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

export default function Home() {
	const [current, setCurrent] = useState(0);
	return (
		<div className="flex justify-between absolute bottom-0 bg-th-primary w-full px-4 pt-4 pb-3.5 rounded-t-3xl">
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
					"flex items-center w-full gap-2.5 rounded-2xl px-5 py-2 mx-auto",
					isActive ? "bg-th-bg" : "bg-transparent text-th-bg justify-center"
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
