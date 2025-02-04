import { useEffect } from "react";

import { IconCheck, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";

import { Spacer } from "@components/Spacer";
import { Toast, useToastState } from "@components/Toast/state.ts";

import { useTimeout } from "@hooks/timeout.ts";

import { c } from "@utils/styles.ts";

export function AppToast() {
	const state = useToastState();

	const withTimeout = useTimeout();

	useEffect(() => {
		withTimeout(() => Toast.hide(), 3000);
	}, [state]);

	const initial = { scale: 0, opacity: 0 };
	const animate = { scale: 1, opacity: 1 };
	const exit = { scale: 0.7, opacity: 0 };

	const colorClassName = state.type === "SUCCESS" ? "text-th-green" : "text-th-red";

	return (
		<div className="absolute bottom-18 w-full center">
			<AnimatePresence>
				{state.show && (
					<motion.div initial={initial} animate={animate} exit={exit} className="flex items-center px-3.5 py-2 bg-th-black rounded-1.5lg">
						<ToastIcon type={state.type} />
						<Spacer size={10} />
						<p className={colorClassName}>{state.message}</p>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

function ToastIcon({ type }: { type: "SUCCESS" | "ERROR" }) {
	const colorClassName = type === "SUCCESS" ? "bg-th-green" : "bg-th-red";
	const Icon = type === "SUCCESS" ? IconCheck : IconX;

	return (
		<div className={c("center size-5 rounded-full", colorClassName)}>
			<Icon size={16} className="text-th-black" />
		</div>
	);
}
