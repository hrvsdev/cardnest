import { Fragment } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { AddCard } from "@pages/AddCard";
import { Home } from "@pages/Home";
import { UnlockWithPassword } from "@pages/Password/Unlock";
import { UnlockWithPin } from "@pages/Pin/EnterPin";
import { User } from "@pages/User";

import { BottomSheetProvider } from "@components/BottomSheet";
import { AppToast } from "@components/Toast";

import { useCollectRemoteAuthData, useHasCreatedPin, useHasEnabledAuth, useIsAuthenticated } from "@data/auth";
import { useDecryptAndCollectCards } from "@data/card";
import { useCollectUser } from "@data/user";

export default function App() {
	const hasEnabledAuth = useHasEnabledAuth();
	const isAuthenticated = useIsAuthenticated();

	const isAppUnlocked = hasEnabledAuth ? isAuthenticated : true;

	useCollectUser();
	useCollectRemoteAuthData();

	return (
		<Fragment>
			<main className="flex flex-col min-h-dvh h-full w-full">{isAppUnlocked ? <UnlockedRoutes /> : <LockedRoutes />}</main>
			<BottomSheetProvider />
			<AppToast />
		</Fragment>
	);
}

function UnlockedRoutes() {
	useDecryptAndCollectCards();

	return (
		<Routes>
			<Route path="home/*" element={<Home />} />
			<Route path="add/*" element={<AddCard />} />
			<Route path="user/*" element={<User />} />

			<Route path="*" element={<Navigate to="/home" />} />
		</Routes>
	);
}

function LockedRoutes() {
	const hasCreatedPin = useHasCreatedPin();

	return (
		<Routes>
			<Route path="password/unlock/*" element={<UnlockWithPassword />} />
			<Route path="pin/unlock/*" element={<UnlockWithPin />} />

			<Route path="*" element={<Navigate to={hasCreatedPin ? "/pin/unlock" : "/password/unlock"} />} />
		</Routes>
	);
}
