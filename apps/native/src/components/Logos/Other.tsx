import { IconForbid2 } from "tabler-icons-react-native";

import { TH_WHITE_85 } from "@styles/colors.ts";

export function Other({ width = 32 }: { width?: number }) {
	return <IconForbid2 width={width} height={width} fill={TH_WHITE_85} />;
}
