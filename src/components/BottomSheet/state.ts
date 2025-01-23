import { ReactNode } from "react";

import { observable } from "@legendapp/state";
import { useSelector } from "@legendapp/state/react";

type BottomSheetState = {
	isOpen: boolean;
	component: ReactNode;
	onConfirm: () => void;
};

export const bottomSheetState = observable<BottomSheetState>({
	isOpen: false,
	component: null,
	onConfirm: () => {}
});

export function useBottomSheetState() {
	return useSelector(bottomSheetState);
}

export function openBottomSheet(component: ReactNode, onConfirm: () => void) {
	bottomSheetState.set({ isOpen: true, component, onConfirm });
}

export function closeBottomSheet() {
	bottomSheetState.isOpen.set(false);
}
