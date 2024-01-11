import { Fragment } from "react";

import { PageContainer } from "@components/Containers";
import { HeaderTitle } from "@components/Header/HeaderTitle.tsx";
import { TabBar } from "@components/TabBar";

export function User() {
	return (
		<Fragment>
			<HeaderTitle title="You" />
			<PageContainer />

			<TabBar />
		</Fragment>
	);
}
