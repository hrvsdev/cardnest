import { observable } from "@legendapp/state";
import { useSelector } from "@legendapp/state/react";

type ToastType = "SUCCESS" | "ERROR";

type ToastData = {
	show: boolean;
	message: string;
	type: ToastType;
};

const toastState = observable<ToastData>({ show: false, message: "", type: "ERROR" });

export const useToastState = () => useSelector(toastState);

export const Toast = {
	success(message: string) {
		toastState.set({ show: true, message: message, type: "SUCCESS" });
	},

	error(message: string) {
		toastState.set({ show: true, message: message, type: "ERROR" });
	},

	hide() {
		toastState.show.set(false);
	}
};
