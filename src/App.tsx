import { Navigate, Route, Routes } from "react-router-dom";

import { Home } from "@pages/Home";

import { Header } from "@components/Header";
import { TabBar } from "@components/TabBar";

export default function App() {
	return (
		<main className="flex flex-col min-h-dvh h-full w-full">
			<Routes>
				<Route path="home" element={<Home />} />
				<Route path="add" element={<Header title="Add Card" />} />
				<Route path="user" element={<Header title="You" />} />
				<Route path="*" element={<Navigate to="home" />} />
			</Routes>
			<TabBar />
		</main>
	);
}
