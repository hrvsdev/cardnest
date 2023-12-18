import { PropsWithChildren } from "react";

export default function Show({ when, children }: PropsWithChildren<{ when: boolean }>) {
	return when ? <>{children}</> : null;
}
