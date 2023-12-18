import { ReactNode, useState } from "react";
import { IconAdjustments, IconCreditCard, IconSmartHome, IconUser } from "@tabler/icons-react";
import { c } from "../../utils/styles.ts";
import { motion } from "framer-motion";

const tabs = [
	{
		icon: <IconSmartHome width={28}/>,
		label: "Home"
	},
	{
		icon: <IconCreditCard width={28}/>,
		label: "Cards"
	},
	{
		icon: <IconAdjustments width={28}/>,
		label: "More"
	},
	{
		icon: <IconUser width={28}/>,
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
	icon: ReactNode;
	label: string;
	isActive: boolean;
	onClick: () => void;
};

const tabVariant = {
	active: {
		width: "40%",
		transition: {
			type: "tween",
			duration: 0.4
		}
	},
	inactive: {
		width: "20%",
		transition: {
			type: "tween",
			duration: 0.4
		}
	}
};

const tabTextVariant = {
	active: {
		opacity: 1,
		x: 0,
		display: "block",
		transition: {
			type: "tween",
			duration: 0.3,
			delay: 0.3
		}
	},
	inactive: {
		opacity: 0,
		x: -30,
		transition: {
			type: "tween",
			duration: 0.3,
			delay: 0.1
		},
		transitionEnd: { display: "none" }
	}
};

function TabButton({ icon, label, isActive, onClick }: TabButtonProps) {
	return (
		<motion.button
			onClick={onClick}
			variants={tabVariant}
			animate={isActive ? "active" : "inactive"}
		>
			<div
				className={c(
					"flex items-center w-full gap-2.5 rounded-2xl h-10 px-5 mx-auto",
					isActive ? "bg-th-bg" : "text-th-bg"
				)}
			>
				{icon}
				<motion.span variants={tabTextVariant}>
					{label}
				</motion.span>
			</div>
		</motion.button>
	);
}
