import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { AddCard } from "@pages/AddCard";
import { Home } from "@pages/Home";
import { Pin } from "@pages/Pin";
import { ConfirmPin } from "@pages/Pin/ConfirmPin";
import { CreatePin } from "@pages/Pin/CreatePin";
import { User } from "@pages/User";

import { UseIsAuthenticatedValue } from "@hooks/auth";

export default function App() {
	// @ts-ignore
	const isAuthenticated = UseIsAuthenticatedValue();
	return (
		<Suspense>
			<main className="flex flex-col min-h-dvh h-full w-full">
				<Routes>
					<Route path="home/*" element={<Home />} />
					<Route path="add/*" element={<AddCard />} />
					<Route path="user/*" element={<User />} />
					<Route path="pin/create">
						<Route index element={<CreatePin />} />
						<Route path="confirm" element={<ConfirmPin />} />
					</Route>
					<Route path="*" element={<Navigate to="home" />} />
				</Routes>
			</main>
		</Suspense>
	);
}

// @ts-ignore
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

// @ts-ignore
function UnauthenticatedRoutes() {
	return (
		<Routes>
			<Route index element={<Pin />} />
			<Route path="pin/create">
				<Route index element={<CreatePin />} />
				<Route path="confirm" element={<ConfirmPin />} />
			</Route>
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
}
