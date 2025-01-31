import { observable } from "@legendapp/state";
import { useSelector } from "@legendapp/state/react";

import { preferencesState } from "@data/preferences/core.ts";

const maskCardNumber = observable(() => preferencesState.userInterface.maskCardNumber.get());

export const useMaskCardNumber = () => useSelector(maskCardNumber);
