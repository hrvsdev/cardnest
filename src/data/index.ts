import { observable } from "@legendapp/state";

export const appDataState = observable({
	user: false,
	localAuth: false,
	remoteAuth: false,
	cards: false,
	areCardsMerging: false,
})
