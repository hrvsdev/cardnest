import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { createRoot } from "react-dom/client";

import App from "./App.tsx";

import "./index.css";

function Root() {
	return (
		<StrictMode>
			<RouterProvider router={createBrowserRouter([{ path: "/*", element: <App /> }])} />
		</StrictMode>
	);
}

createRoot(document.getElementById("root")!).render(<Root />);
