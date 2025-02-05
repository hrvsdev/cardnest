import { Children, isValidElement, PropsWithChildren, ReactNode } from "react";

import { AnimatePresence, motion } from "framer-motion";

export function Show({ when, children }: PropsWithChildren<{ when: any }>) {
	let truthyChildren: ReactNode[] = [];
	let falsyChildren: ReactNode[] = [];

	Children.forEach(children, (child) => {
		if (!isValidElement(child) || child.type !== Else) {
			truthyChildren.push(child);
		} else {
			falsyChildren.push(child);
		}
	});

	return when ? truthyChildren : falsyChildren;
}

export function Else({ children }: PropsWithChildren<{}>) {
	return children;
}

export function ShowAnimated({ when, children }: PropsWithChildren<{ when: boolean }>) {
	const initial = { height: 0, opacity: 0 };
	const animate = { height: "auto", opacity: 1 };

	return (
		<AnimatePresence initial={false}>
			{when && (
				<div className="overflow-hidden w-full">
					<motion.div initial={initial} animate={animate} exit={initial}>
						{children}
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
}

export function ShowAnimatedFade({ when, children }: PropsWithChildren<{ when: boolean }>) {
	const initial = { opacity: 0 };
	const animate = { opacity: 1 };

	return (
		<AnimatePresence initial={false}>
			{when && (
				<motion.div className="w-full" initial={initial} animate={animate} exit={initial}>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	);
}
