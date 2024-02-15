import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

import { SCREEN_STYLE } from "@styles/common.ts";

export const DEFAULT_STACK_OPTIONS: NativeStackNavigationOptions = {
	headerShown: false,
	contentStyle: SCREEN_STYLE
};
