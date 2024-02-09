import { PageContainer, PageRoot } from "@components/Containers";
import { HeaderTitle } from "@components/Header/HeaderTitle.tsx";

export default function Page() {
	return (
		<PageRoot>
			<HeaderTitle title="Add Card" />
			<PageContainer />
		</PageRoot>
	);
}
