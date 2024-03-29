import { Redirect } from "expo-router";

import { useHasCreatedPin, useIsAuthenticatedValue } from "@libs/hooks/src/auth";

export default function RootPage() {
	const isAuthenticated = useIsAuthenticatedValue();
	const hasCreatedPin = useHasCreatedPin();

	const showApp = hasCreatedPin ? isAuthenticated : true;

	return <Redirect href={showApp ? "/home" : "/pin/enter"} />;
}
