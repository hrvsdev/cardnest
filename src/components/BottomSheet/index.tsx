import { ReactNode, useEffect } from "react";

import { Button } from "@components/Button";

type Props = {
	children: ReactNode;
	onClose: () => void;
};

export function BottomSheet({}: Props) {
	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "auto";
		};
	}, []);

	return (
		<div className="fixed flex items-end inset-0 w-screen h-dvh bg-th-black/20 z-20 backdrop-blur-xs">
			<div className="bg-gradient-to-tr from-th-darker-blue bg-th-black w-full rounded-t-2xl border-t border-th-sky/20 shadow-2xl shadow-th-sky">
				<div className="h-full p-4">
					<h1 className="text-th-white text-center text-xl font-bold">Delete card</h1>
					<p className="text-th-white text-center font-medium">
						Are you sure you want to delete this card?
						<br />
						This action cannot be undone.
					</p>
					<div className="flex flex-col gap-3 mt-10">
						<Button label="Cancel" variant="flat" onClick={() => {}} />
						<Button label="Confirm" theme="danger" onClick={() => {}} />
					</div>
				</div>
			</div>
		</div>
	);
}
