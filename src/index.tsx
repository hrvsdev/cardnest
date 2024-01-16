import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { createRoot } from "react-dom/client";

import App from "./App.tsx";

import "./index.css";

import { getFromLocalStorage } from "@utils/local-storage.ts";

const APP_VERSION = "1";

const router = createBrowserRouter([{ path: "/*", element: <App /> }]);

function Root() {
	return (
		<StrictMode>
			<RouterProvider router={router} />
		</StrictMode>
	);
}

function getAppRoot() {
	const CURRENT = getFromLocalStorage("cardnest/version") ?? 0;

	if (CURRENT !== APP_VERSION) {
		localStorage.clear();
		localStorage.setItem("cardnest/version", APP_VERSION);
	}

	return createRoot(document.getElementById("root")!);
}

getAppRoot().render(<Root />);
