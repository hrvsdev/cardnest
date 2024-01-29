import { Fragment } from "react";

import { PageContainer } from "@components/Containers";
import { SubPageHeader } from "@components/Header/SubPageHeader.tsx";

export function UserInterface() {
	return (
		<Fragment>
			<SubPageHeader title="User Interface" leftIconLabel="Settings" />
			<PageContainer />
		</Fragment>
	);
}
