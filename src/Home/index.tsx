import { ReactNode, useState } from "react";
import { IconAdjustments, IconCreditCard, IconSmartHome } from "@tabler/icons-react";
import Show from "../components/Show.tsx";

export default function Home() {
	const [current, setCurrent] = useState(0);
	return (
		<div className="flex justify-between absolute bottom-0 bg-th-primary w-full px-4 pt-4 pb-3.5 rounded-t-3xl">
			<TabButton icon={<IconSmartHome />} label="Home" isActive={current === 0} onClick={() => setCurrent(0)} />
			<TabButton icon={<IconCreditCard />} label="Cards" isActive={current === 1} onClick={() => setCurrent(1)} />
			<TabButton icon={<IconAdjustments />} label="More" isActive={current === 2} onClick={() => setCurrent(2)} />
		</div>
	);
}

type TabButtonProps = {
	icon: ReactNode;
	label: string;
	isActive: boolean;
	onClick: () => void;
};

function TabButton({ icon, label, isActive, onClick }: TabButtonProps) {
	return (
		<button className="w-1/3" onClick={onClick}>
			<div className="flex items-center gap-1.5 rounded-2xl bg-th-bg px-5 py-2 mx-auto">
				{icon}
				<Show when={isActive}>
					<span className="text-sm">{label}</span>
				</Show>
			</div>
		</button>
	);
}
