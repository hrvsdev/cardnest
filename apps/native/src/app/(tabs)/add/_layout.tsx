import { Stack } from "expo-router";

import { DEFAULT_STACK_OPTIONS } from "@utils/stack.ts";

export default function AddCardLayout() {
	return <Stack screenOptions={DEFAULT_STACK_OPTIONS} >
		<Stack.Screen
			name="pin-create"
			options={{ presentation: "transparentModal", animation: "none" }}
		/>
	</Stack>
}
