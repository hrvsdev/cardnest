import { PropsWithChildren } from "react";

export function Show({ when, children }: PropsWithChildren<{ when: boolean }>) {
	return when ? <>{children}</> : null;
}
