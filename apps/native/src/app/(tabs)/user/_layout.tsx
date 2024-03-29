import { Stack } from "expo-router";

import { DEFAULT_STACK_OPTIONS } from "@utils/stack.ts";

export default function UserLayout() {
	return (
		<Stack screenOptions={DEFAULT_STACK_OPTIONS}>
			<Stack.Screen
				name="delete-data"
				options={{ presentation: "transparentModal", animation: "none" }}
			/>
		</Stack>
	);
}
