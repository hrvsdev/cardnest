import { Fragment } from "react";

import { PageContainer } from "@components/Containers";
import { HeaderTitle } from "@components/Header/HeaderTitle.tsx";

export function User() {
	return (
		<Fragment>
			<HeaderTitle title="You" />
			<PageContainer />
		</Fragment>
	);
}
