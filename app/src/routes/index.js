import RouteHandler from "../components/RouteHandler";
import NotFoundPage from "../components/NotFoundPage";

export const index = [
    {
        path: "/@:datasource/:path+",
        component: RouteHandler,
    },
    {
        path: "/:path+",
        component: RouteHandler,
    },
    {
        path: "/",
        component: RouteHandler,
    },
    {
        path: "**",
        component: NotFoundPage
    }
];
