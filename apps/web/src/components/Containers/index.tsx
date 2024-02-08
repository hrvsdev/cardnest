import { PropsWithChildren } from "react";

import { c } from "@libs/utils/src/styles.ts";

export function PageContainer({ className, children }: PropsWithChildren<{ className?: string }>) {
	return <div className={c("p-4 grow", className)}>{children}</div>;
}
