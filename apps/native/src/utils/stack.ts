import { NativeStackNavigationOptions } from "react-native-screens/native-stack";

import { SCREEN_STYLE } from "@styles/common.ts";

export const DEFAULT_STACK_OPTIONS = {
	headerShown: false,
	contentStyle: SCREEN_STYLE
} satisfies NativeStackNavigationOptions;
