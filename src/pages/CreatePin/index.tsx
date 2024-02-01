import { Route, Routes } from "react-router-dom";

import { ConfirmPin } from "@pages/CreatePin/ConfirmPin";
import { EnterNewPin } from "@pages/CreatePin/EnterNewPin";

export function CreatePin() {
	return (
		<Routes>
			<Route index element={<EnterNewPin />} />
			<Route path="confirm" element={<ConfirmPin />} />
		</Routes>
	);
}
