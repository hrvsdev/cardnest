import { ReactNode } from "react";

import { AnimatePresence, motion, Variants } from "framer-motion";

import { DialogBackground, DialogContainer } from "@components/Dialog";

type Props = {
	show: boolean;
	children: ReactNode;
	onClose: () => void;
};

export function BottomSheet({ onClose, children, show }: Props) {
	return (
		<AnimatePresence>
			{show && (
				<DialogContainer>
					<div className="relative h-full">
						<DialogBackground onClick={onClose} />
						<SheetContentContainer>
							<div className="h-full p-4 pb-12 bg-gradient-to-tr from-th-darker-blue to-th-black w-full rounded-t-2xl border-t border-th-sky/20 shadow-2xl shadow-th-sky">
								{children}
							</div>
						</SheetContentContainer>
					</div>
				</DialogContainer>
			)}
		</AnimatePresence>
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
