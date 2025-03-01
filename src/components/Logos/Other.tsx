import { IconForbid2 } from "@tabler/icons-react";

import { TH_WHITE } from "@theme/index";

export function Other({ className }: { className?: string }) {
	return <IconForbid2 color={TH_WHITE} opacity={0.85} size={24} className={className} />;
}
