import { ReactNode, useEffect } from "react";

import { AnimatePresence, motion, Variants } from "framer-motion";

type Props = {
	show: boolean;
	children: ReactNode;
	onClose: () => void;
};

type BackdropProps = {
	children: ReactNode;
	onClick: () => void;
};

export function BottomSheet({ onClose, children, show }: Props) {
	return (
		<AnimatePresence>
			{show && (
				<Backdrop onClick={onClose}>
					<div className="h-full p-4 pb-12 bg-gradient-to-tr from-th-darker-blue to-th-black w-full rounded-t-2xl border-t border-th-sky/20 shadow-2xl shadow-th-sky">
						{children}
					</div>
				</Backdrop>
			)}
		</AnimatePresence>
	);
}

function DialogContainer({ children }: { children: ReactNode }) {
	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "auto";
		};
	}, []);

	return <div className="fixed inset-0 w-screen h-dvh z-20">{children}</div>;
}

function DialogBackground({ onClick }: { onClick: () => void }) {
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

function Backdrop({ onClick, children }: BackdropProps) {
	return (
		<DialogContainer>
			<div className="relative h-full">
				<DialogBackground onClick={onClick} />
				<SheetContentContainer>{children}</SheetContentContainer>
			</div>
		</DialogContainer>
	);
}

function SheetContentContainer({ children }: { children: ReactNode }) {
	return (
		<motion.div
			variants={slideUp}
			initial="hidden"
			animate="visible"
			exit="exit"
			className="absolute bottom-0 w-full"
		>
			{children}
		</motion.div>
	);
}

const slideUp: Variants = {
	hidden: {
		y: 320
	},
	visible: {
		y: 32,
		transition: {
			duration: 0.1,
			type: "spring",
			damping: 25,
			stiffness: 300
		}
	},
	exit: {
		y: 320,
		transition: {
			duration: 0.2
		}
	}
};
