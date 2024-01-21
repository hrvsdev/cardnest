import { ReactNode, useEffect } from "react";

type Props = {
	children: ReactNode;
	onClose: () => void;
};

export function BottomSheet({ onClose, children }: Props) {
	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "auto";
		};
	}, []);

	return (
		<div
			className="fixed flex items-end inset-0 w-screen h-dvh bg-th-black/20 z-20 backdrop-blur-xs"
			onClick={onClose}
		>
			<div className="bg-gradient-to-tr from-th-darker-blue bg-th-black w-full rounded-t-2xl border-t border-th-sky/20 shadow-2xl shadow-th-sky">
				<div className="h-full p-4" onClick={(e) => e.stopPropagation()}>
					{children}
				</div>
			</div>
		</div>
	);
}
