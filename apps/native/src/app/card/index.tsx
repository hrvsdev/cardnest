import { SafeAreaView } from "react-native-safe-area-context";

import { PageContainer } from "@components/Containers";
import { HeaderTitle } from "@components/Header/HeaderTitle.tsx";

export default function Page() {
	return (
		<SafeAreaView>
			<HeaderTitle title="Add Card" />
			<PageContainer />
		</SafeAreaView>
	);
}
