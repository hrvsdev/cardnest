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
							<div className="bg-th-sky/20 rounded-t-2xl shadow-2xl shadow-th-sky pt-0.25">
								<div className="p-4 bg-gradient-to-tr from-th-darker-blue to-th-black w-full rounded-t-2xl">{children}</div>
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
			transition={{ type: "spring", bounce: 0, duration: 0.2 }}
			className="absolute bottom-0 w-full"
			children={children}
		/>
	);
}

const slideUp: Variants = {
	hidden: {
		y: "100%",
		opacity: 0
	},
	visible: {
		y: 0,
		opacity: 1
	},
	exit: {
		y: "100%",
		opacity: 0
	}
};
