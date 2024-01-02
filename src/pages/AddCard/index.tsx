import { Fragment } from "react";

import { PageContainer } from "@components/Containers";
import { HeaderTitle } from "@components/Header/HeaderTitle.tsx";

export function AddCard() {
	return (
		<Fragment>
			<HeaderTitle title="Add Card" />
			<PageContainer />
		</Fragment>
	);
}
