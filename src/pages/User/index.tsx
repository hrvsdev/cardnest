import { Fragment } from "react";

import { PageContainer } from "@components/Containers";
import { HeaderTitle } from "@components/Header/HeaderTitle.tsx";

export function User() {
	return (
		<Fragment>
			<HeaderTitle title="You" />
			<PageContainer className="h-[200vh]">
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, corporis? Optio, numquam nam exercitationem dolore obcaecati vero, dignissimos inventore dicta illo facere expedita modi laudantium. Quam odio earum porro? Praesentium debitis nam maiores eum. Minus rem eum eos saepe autem!
			</PageContainer>
		</Fragment>
	);
}
