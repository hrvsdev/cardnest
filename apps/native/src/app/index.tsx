import { useEffect } from "react";
import { Redirect } from "expo-router";

import { MMKV } from "react-native-mmkv";

import { useHasCreatedPin, useIsAuthenticatedValue } from "@libs/hooks/src/auth";

const storage = new MMKV();

export default function RootPage() {
	const isAuthenticated = useIsAuthenticatedValue();
	const hasCreatedPin = useHasCreatedPin();

	const showApp = hasCreatedPin ? isAuthenticated : true;

	useEffect(() => {
		const countValue = storage.getNumber("count") ?? 0;
		storage.set("count", countValue + 1);

		console.log("Count: ", countValue);
	}, []);

	return <Redirect href={showApp ? "/home" : "/pin/enter"} />;
}
