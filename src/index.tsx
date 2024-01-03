import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { createRoot } from "react-dom/client";

import App from "./App.tsx";

import "./index.css";

const router = createBrowserRouter([{ path: "/*", element: <App /> }]);

function Root() {
	return (
		<StrictMode>
			<RouterProvider router={router} />
		</StrictMode>
	);
}

createRoot(document.getElementById("root")!).render(<Root />);
