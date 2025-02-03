import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { createRoot } from "react-dom/client";

import App from "./App";

import "./firebase/index.ts";
import "./index.css";

const router = createBrowserRouter([{ path: "/*", element: <App /> }]);

function Root() {
	return (
		<StrictMode>
			<RouterProvider router={router} />
		</StrictMode>
	);
}

function getAppRoot() {
	return createRoot(document.getElementById("root")!);
}

getAppRoot().render(<Root />);
