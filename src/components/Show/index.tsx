import { PropsWithChildren } from "react";

import { AnimatePresence, motion } from "framer-motion";

export function Show({ when, children }: PropsWithChildren<{ when: any }>) {
	return when ? <>{children}</> : null;
}

export function ShowAnimated({ when, children }: PropsWithChildren<{ when: boolean }>) {
	const initial = { height: 0, opacity: 0 };
	const animate = { height: "auto", opacity: 1 };

	return (
		<AnimatePresence>
			{when && (
				<div className="overflow-hidden">
					<motion.div initial={initial} animate={animate} exit={initial}>
						{children}
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
}
