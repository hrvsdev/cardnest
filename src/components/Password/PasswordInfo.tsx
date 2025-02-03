import { ReactNode } from "react";

import { IconCheck, IconExclamationMark, IconProps, IconX } from "@tabler/icons-react";

import { ShowAnimated } from "@components/Show";

import { c } from "@utils/styles.ts";

type Props = {
	text: string;
	type: PasswordInfoType;
	isVisible?: boolean;
};

type PasswordInfoType = "SUCCESS" | "ERROR" | "WARN" | "DONE";

export function PasswordInfo({ text, type, isVisible = false }: Props) {
	let Icon: (props: IconProps) => ReactNode;
	let colorClassName: string;
	let bgColorClassName: string;

	switch (type) {
		case "SUCCESS":
			Icon = IconCheck;
			colorClassName = "text-th-green";
			bgColorClassName = "bg-th-green";
			break;
		case "ERROR":
			Icon = IconX;
			colorClassName = "text-th-red";
			bgColorClassName = "bg-th-red";
			break;
		case "WARN":
			Icon = IconExclamationMark;
			colorClassName = "text-th-yellow";
			bgColorClassName = "bg-th-yellow";
			break;
		case "DONE":
			Icon = IconCheck;
			colorClassName = "text-th-white/20";
			bgColorClassName = "bg-th-white/20";
			break;
	}

	return (
		<ShowAnimated when={isVisible}>
			<div className="flex">
				<div className="flex items-center h-5 pl-2 pr-1.5">
					<div className={c("center size-3 rounded-full", bgColorClassName)}>
						<Icon size={10} className="text-th-black" />
					</div>
				</div>
				<p className={c("text-sm", colorClassName)}>{text}</p>
			</div>
		</ShowAnimated>
	);
}
