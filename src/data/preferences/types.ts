export type Preferences = {
	userInterface: UserInterface;
	updates: Updates;
};

type UserInterface = {
	maskCardNumber: boolean;
};

type Updates = {
	checkAtLaunch: boolean;
};

export function defaultPreferences(): Preferences {
	return {
		userInterface: {
			maskCardNumber: false
		},
		updates: {
			checkAtLaunch: true
		}
	};
}
