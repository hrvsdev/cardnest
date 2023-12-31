import { Fragment } from "react";

import { PageContainer } from "@components/Containers";
import { Header } from "@components/Header";

export function User() {
	return (
		<Fragment>
			<Header title="You" />
			<PageContainer />
		</Fragment>
	);
}
