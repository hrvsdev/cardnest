import { Fragment, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { AddCard } from "@pages/AddCard";
import { Home } from "@pages/Home";
import { Pin } from "@pages/Pin";
import { ConfirmPin } from "@pages/Pin/ConfirmPin";
import { CreatePin } from "@pages/Pin/CreatePin";
import { User } from "@pages/User";

import { useHasCreatedPin, useIsAuthenticatedValue } from "@hooks/auth";

export default function App() {
	const isAuthenticated = useIsAuthenticatedValue();
	const hasCreatedPin = useHasCreatedPin();

	const showApp = hasCreatedPin ? isAuthenticated : true;

	return (
		<Suspense>
			<main className="flex flex-col min-h-dvh h-full w-full">
				<Routes>
					{showApp ? (
						<Fragment>
							<Route path="home/*" element={<Home />} />
							<Route path="add/*" element={<AddCard />} />
							<Route path="user/*" element={<User />} />
						</Fragment>
					) : (
						<Route index element={<Pin />} />
					)}
					<Route path="pin/create">
						<Route index element={<CreatePin />} />
						<Route path="confirm" element={<ConfirmPin />} />
					</Route>
					<Route path="*" element={<Navigate to={showApp ? "home" : "/"} />} />
				</Routes>
			</main>
		</Suspense>
	);
}
