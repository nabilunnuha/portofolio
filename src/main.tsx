import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider, createTheme } from "@mantine/core";

import "@mantine/core/styles.css";
import "./index.css";
import { routeTree } from "./routeTree";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5, // cache 5 menit
			retry: 2,
		},
	},
});

const theme = createTheme({
	fontFamily: '"JetBrains Mono", "Fira Code", monospace',
});

const router = createRouter({ routeTree });

createRoot(document.getElementById("app")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<MantineProvider theme={theme} defaultColorScheme="dark">
				<RouterProvider router={router} />
			</MantineProvider>
		</QueryClientProvider>
	</StrictMode>,
);
