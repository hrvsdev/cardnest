import { Route, Routes } from "react-router-dom";

import { UpdateCardEditor } from "@pages/Home/Card/Editor";

export function CardView() {
	return (
		<Routes>
			<Route index element={<CardViewPage />} />
			<Route path="update" element={<UpdateCardEditor />} />
		</Routes>
	);
}

function CardViewPage() {
	return null;
}
