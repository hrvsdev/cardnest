import { Text, View } from "react-native";

import { PageContainer, PageRoot } from "@components/Containers";

export default function Page() {
	return (
		<PageRoot>
			<PageContainer>
				<View>
					<Text style={{ color: "white" }}>LOL</Text>
				</View>
			</PageContainer>
		</PageRoot>
	);
}
