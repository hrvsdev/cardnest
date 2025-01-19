import { ReactNode, useEffect } from "react";

import { motion } from "framer-motion";

export function DialogContainer({ children }: { children: ReactNode }) {
	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "auto";
		};
	}, []);

	return <div className="fixed inset-0 w-screen h-dvh z-20">{children}</div>;
}

export function DialogBackground({ onClick }: { onClick: () => void }) {
	return (
		<motion.div
			className="absolute inset-0 bg-th-black/60 backdrop-blur-xs"
			onClick={onClick}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ type: "spring", bounce: 0, duration: 0.2 }}
		/>
	);
}
