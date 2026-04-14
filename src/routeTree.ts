import { createRootRoute, createRoute } from "@tanstack/react-router";
import Root from "./routes/__root";
import IndexPage from "./routes/index";
import AboutPage from "./routes/about";
import ProjectsPage from "./routes/projects";
import BlogPage from "./routes/blog";
import Contact from "./routes/contact";
import NotFoundPage from "./components/NotFound";

const rootRoute = createRootRoute({
	component: Root,
	notFoundComponent: NotFoundPage,
});

export const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: IndexPage,
});

export const aboutRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/about",
	component: AboutPage,
});

export const projectsRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/projects",
	component: ProjectsPage,
});

export const blogRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/blog",
	component: BlogPage,
});

export const ContactRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/contact",
	component: Contact,
});

export const routeTree = rootRoute.addChildren([
	indexRoute,
	aboutRoute,
	projectsRoute,
	blogRoute,
	ContactRoute,
]);
