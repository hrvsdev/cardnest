import { Navigate, Route, Routes } from "react-router-dom";

import { AddCard } from "@pages/AddCard";
import { Home } from "@pages/Home";
import { User } from "@pages/User";

import { TabBar } from "@components/TabBar";

export default function App() {
	return (
		<main className="flex flex-col min-h-dvh h-full w-full">
			<Routes>
				<Route path="home" element={<Home />} />
				<Route path="add" element={<AddCard />} />
				<Route path="user" element={<User />} />
				<Route path="*" element={<Navigate to="home" />} />
			</Routes>
			<TabBar />
		</main>
	);
}
