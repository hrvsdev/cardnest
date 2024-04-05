import { Stack } from "expo-router";

import { DEFAULT_STACK_OPTIONS } from "@utils/stack.ts";

export default function CardViewLayout() {
	return <Stack screenOptions={DEFAULT_STACK_OPTIONS} />;
}
