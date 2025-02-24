import { Route, Routes } from "react-router-dom";

import { ConfirmPin } from "@pages/Pin/Create/Confirm";
import { EnterNewPin } from "@pages/Pin/Create/Create";

export function CreatePin() {
	return (
		<Routes>
			<Route index element={<EnterNewPin />} />
			<Route path="confirm" element={<ConfirmPin />} />
		</Routes>
	);
}
