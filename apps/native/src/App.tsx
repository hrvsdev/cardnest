import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
	return (
		<View style={styles.container}>
			<Text>Open up App.tsx to start working on your app!</Text>
			<StatusBar style="auto" />
		</View>
	);
}

/**
 *   "dependencies": {
 * //    "expo": "~50.0.5",
 * //    "expo-status-bar": "~1.11.1",
 * //    "react": "18.2.0",
 * //    "react-native": "0.73.2"
 *   },
 *   "devDependencies": {
 * //    "@babel/core": "^7.20.0",
 * //    "@types/react": "~18.2.45",
 * //    "typescript": "^5.1.3"
 *   },
 */

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	}
});
