import { Fragment, PropsWithChildren, ReactNode } from "react";

import { SubPageHeader } from "@components/Header/SubPageHeader.tsx";

import { c } from "@utils/styles.ts";

type SubPageRootProps = {
	title: string;
	backLabel?: string;

	actionLabel?: string;
	actionIcon?: ReactNode;
	onAction?: () => void;

	className?: string;

	children?: ReactNode;
};

export function SubPageRoot(props: SubPageRootProps) {
	return (
		<Fragment>
			<SubPageHeader
				title={props.title ?? ""}
				backLabel={props.backLabel}
				actionLabel={props.actionLabel}
				actionIcon={props.actionIcon}
				onAction={props.onAction}
			/>
			<PageContainer className={c("flex flex-col", props.className)} children={props.children} />
		</Fragment>
	);
}

export function PageContainer({ className, children }: PropsWithChildren<{ className?: string }>) {
	return <div className={c("p-4 grow", className)}>{children}</div>;
}
