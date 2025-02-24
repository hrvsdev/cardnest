import { Fragment } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { useSelector } from "@legendapp/state/react";

import { AddCard } from "@pages/AddCard";
import { Home } from "@pages/Home";
import { UnlockWithPassword } from "@pages/Password/Unlock";
import { UnlockWithNewPassword } from "@pages/Password/Unlock/UnlockWithNewPassword.tsx";
import { UnlockWithPin } from "@pages/Pin/Unlock/index.tsx";
import { User } from "@pages/User";

import { BottomSheetProvider } from "@components/BottomSheet";
import { AppToast } from "@components/Toast";

import { useCollectRemoteAuthData, useHasCreatedPin, useHasEnabledAuth, useIsAuthenticated, useIsPasswordStale } from "@data/auth";
import { useDecryptAndCollectCards } from "@data/card";
import { appDataState } from "@data/index.ts";
import { isSignedIn, useCollectUser } from "@data/user";

const useHasLoaded = () => {
	return useSelector(() => appDataState.user.get() && (isSignedIn.get() ? appDataState.remoteAuth.get() : true));
};

export default function App() {
	const hasLoaded = useHasLoaded();

	const hasEnabledAuth = useHasEnabledAuth();
	const isAuthenticated = useIsAuthenticated();

	const isAppUnlocked = hasEnabledAuth ? isAuthenticated : true;

	useCollectUser();
	useCollectRemoteAuthData();

	if (!hasLoaded) return <SplashScreen />;

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
	const isPasswordStale = useIsPasswordStale();

	return (
		<Routes>
			<Route path="password/unlock/*" element={isPasswordStale ? <UnlockWithNewPassword /> : <UnlockWithPassword />} />
			<Route path="pin/unlock/*" element={<UnlockWithPin />} />

			<Route path="*" element={<Navigate to={hasCreatedPin ? "/pin/unlock" : "/password/unlock"} />} />
		</Routes>
	);
}

function SplashScreen() {
	return (
		<div className="w-screen h-dvh center">
			<img src="/images/splash.svg" alt="CardNest" />
		</div>
	);
}
