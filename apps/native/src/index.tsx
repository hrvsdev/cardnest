import registerRootComponent from "expo/build/launch/registerRootComponent";

import { SafeAreaProvider } from "react-native-safe-area-context";

import App from "./App";

function Root() {
	return (
		<SafeAreaProvider>
			<App />
		</SafeAreaProvider>
	);
}

registerRootComponent(Root);
