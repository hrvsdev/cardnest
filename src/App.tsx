import { Fragment } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { AddCard } from "@pages/AddCard";
import { Home } from "@pages/Home";
import { UnlockWithPin } from "@pages/Pin/EnterPin";
import { User } from "@pages/User";

import { BottomSheetProvider } from "@components/BottomSheet";

import { useHasEnabledAuth, useIsAuthenticated } from "@data/auth";
import { useCheckAndEncryptOrDecryptCards, useDecryptAndCollectCards } from "@data/card";

export default function App() {
	const hasEnabledAuth = useHasEnabledAuth();
	const isAuthenticated = useIsAuthenticated();

	const isAppUnlocked = hasEnabledAuth ? isAuthenticated : true;

	return (
		<Fragment>
			<main className="flex flex-col min-h-dvh h-full w-full">{isAppUnlocked ? <UnlockedRoutes /> : <LockedRoutes />}</main>
			<BottomSheetProvider />
		</Fragment>
	);
}

function UnlockedRoutes() {
	useDecryptAndCollectCards();
	useCheckAndEncryptOrDecryptCards();

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
			<Route index element={<UnlockWithPin />} />
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
}
