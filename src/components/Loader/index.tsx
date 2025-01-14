import { IconLoader2 } from "@tabler/icons-react";

import { c } from "@utils/styles.ts";

type Props = {
	size?: number;
	className?: string;
};

export function LoadingIcon({ size = 20, className }: Props) {
	return <IconLoader2 size={size} className={c("text-th-white/60 animate-spin", className)} />;
}
