import { PropsWithChildren, ReactNode, useEffect, useRef } from "react";

import { AnimatePresence, motion, Variants } from "framer-motion";

import { closeBottomSheet, useBottomSheetState } from "@components/BottomSheet/state.ts";
import { Button } from "@components/Button";
import { DialogBackground, DialogContainer } from "@components/Dialog";

export function BottomSheetProvider() {
	const bottomSheetState = useBottomSheetState();
	return <AnimatePresence>{bottomSheetState.isOpen && bottomSheetState.component}</AnimatePresence>;
}

export function BottomSheet({ children }: PropsWithChildren) {
	return (
		<DialogContainer>
			<div className="relative h-full">
				<DialogBackground onClick={closeBottomSheet} />
				<SheetContentContainer>
					<div className="bg-th-sky/20 rounded-t-2xl shadow-2xl shadow-th-sky pt-0.25">
						<div className="p-4 bg-gradient-to-tr from-th-darker-blue to-th-black w-full rounded-t-2xl">{children}</div>
					</div>
				</SheetContentContainer>
			</div>
		</DialogContainer>
	);
}

export function BottomSheetHeading({ children }: PropsWithChildren) {
	return <h1 className="text-xl text-th-white font-bold text-center">{children}</h1>;
}

export function BottomSheetDescription({ children }: PropsWithChildren) {
	return <p className="text-center">{children}</p>;
}

export function BottomSheetButtons({ children }: PropsWithChildren) {
	return <div className="mt-10 space-y-3">{children}</div>;
}

export function BottomSheetPrimaryButton({ title = "Confirm", theme = "primary" }: { title?: string; theme?: "primary" | "danger" }) {
	const bottomSheetState = useBottomSheetState();
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const onClick = () => {
		closeBottomSheet();
		timeoutRef.current = setTimeout(bottomSheetState.onConfirm, 200);
	};

	useEffect(() => {
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, []);

	return <Button title={title} theme={theme} onClick={onClick} />;
}

export function BottomSheetCancelButton({ title = "Cancel" }: { title?: string }) {
	return <Button title={title} variant="flat" onClick={closeBottomSheet} />;
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
