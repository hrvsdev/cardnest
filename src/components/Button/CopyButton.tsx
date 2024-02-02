import { useEffect, useRef, useState } from "react";

import { IconCheck, IconCopy } from "@tabler/icons-react";

import { c } from "@utils/styles.ts";

type Props = {
	text: string;
	iconSize?: string | number;
	className?: string;
	iconClassName?: string;
};

export function CopyButton({ text, className = "", iconSize = 22, iconClassName = "" }: Props) {
	const [isCopied, setIsCopied] = useState(false);

	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const onClick = async () => {
		await window.navigator.clipboard.writeText(text);
		setIsCopied(true);
		timeoutRef.current = setTimeout(() => setIsCopied(false), 2000);
	};

	useEffect(() => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
	}, []);

	const Copy = <IconCopy size={iconSize} className={iconClassName} stroke={1.5} />;
	const Check = <IconCheck size={iconSize} className={iconClassName} />;

	return (
		<button
			className={c("flex justify-center items-center size-12 active:translate-y-0.25", className)}
			onClick={onClick}
		>
			{isCopied ? Check : Copy}
		</button>
	);
}
