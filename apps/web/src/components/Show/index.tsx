import { PropsWithChildren } from "react";

export function Show({ when, children }: PropsWithChildren<{ when: any }>) {
	return when ? <>{children}</> : null;
}
