import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { createRoot } from "react-dom/client";

import App from "./App";

import "./index.css";

import { getFromLocalStorage } from "@utils/local-storage";

const APP_VERSION = "0.1";

const router = createBrowserRouter([{ path: "/*", element: <App /> }]);

function Root() {
	return (
		<StrictMode>
			<RouterProvider router={router} />
		</StrictMode>
	);
}

function getAppRoot() {
	const CURRENT = getFromLocalStorage("cardnest/version") ?? "0";

	if (CURRENT !== APP_VERSION) {
		localStorage.clear();
		localStorage.setItem("cardnest/version", JSON.stringify(APP_VERSION));
	}

	return createRoot(document.getElementById("root")!);
}

getAppRoot().render(<Root />);
