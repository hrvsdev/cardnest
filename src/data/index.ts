import { observable } from "@legendapp/state";

export const appDataState = observable({
	user: false,
	remoteAuth: false,
	areCardsMerging: false
});
