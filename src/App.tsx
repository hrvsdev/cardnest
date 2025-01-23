import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { AddCard } from "@pages/AddCard";
import { Home } from "@pages/Home";
import { Pin } from "@pages/Pin/EnterPin";
import { User } from "@pages/User";

import { BottomSheetProvider } from "@components/BottomSheet";

import { useDecryptAndCollectCards } from "@data/card";

import { useHasCreatedPin, useIsAuthenticatedValue } from "@hooks/auth";

export default function App() {
	const isAuthenticated = useIsAuthenticatedValue();
	const hasCreatedPin = useHasCreatedPin();

	const showApp = hasCreatedPin ? isAuthenticated : true;

	return (
		<Suspense>
			<main className="flex flex-col min-h-dvh h-full w-full">{showApp ? <UnlockedRoutes /> : <LockedRoutes />}</main>
			<BottomSheetProvider />
		</Suspense>
	);
}

function UnlockedRoutes() {
	useDecryptAndCollectCards();

	return (
		<Routes>
			<Route path="home/*" element={<Home />} />
			<Route path="add/*" element={<AddCard />} />
			<Route path="user/*" element={<User />} />

			<Route path="*" element={<Navigate to="home" />} />
		</Routes>
	);
}

function LockedRoutes() {
	return (
		<Routes>
			<Route index element={<Pin />} />
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
}
