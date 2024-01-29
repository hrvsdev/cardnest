import { Fragment } from "react";

import { PageContainer } from "@components/Containers";
import { SubPageHeader } from "@components/Header/SubPageHeader.tsx";

export function Security() {
	return (
		<Fragment>
			<SubPageHeader title="Security" leftIconLabel="Settings" />
			<PageContainer />
		</Fragment>
	);
}
