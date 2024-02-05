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
			className="absolute inset-0 bg-th-black/20 backdrop-blur-xs"
			onClick={onClick}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { duration: 0.2 } }}
			exit={{ opacity: 0, transition: { duration: 0.2 } }}
		/>
	);
}
