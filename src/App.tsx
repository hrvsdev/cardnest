import { Navigate, Route, Routes } from "react-router-dom";

import { AddCard } from "@pages/AddCard";
import { Home } from "@pages/Home";
import { Pin } from "@pages/Pin";
import { User } from "@pages/User";

export default function App() {
	const isAuthenticated = false;
	return (
		<main className="flex flex-col min-h-dvh h-full w-full">
			{isAuthenticated ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />}
		</main>
	);
}

function AuthenticatedRoutes() {
	return (
		<Routes>
			<Route path="home/*" element={<Home />} />
			<Route path="add/*" element={<AddCard />} />
			<Route path="user/*" element={<User />} />
			<Route path="*" element={<Navigate to="home" />} />
		</Routes>
	);
}

function UnauthenticatedRoutes() {
	return (
		<Routes>
			<Route index element={<Pin />} />
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
}
