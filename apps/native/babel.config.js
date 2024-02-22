module.exports = function (api) {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			// Reanimated at the end of the plugins array
			"react-native-reanimated/plugin"
		]
	};
};
