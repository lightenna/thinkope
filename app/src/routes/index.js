import Wrapper from "../components/DataWrapper";
import NotFoundPage from "../components/NotFoundPage";

export const index = [
    {
        path: "/@:datasource/:path+",
        component: Wrapper,
    },
    {
        path: "/:path+",
        component: Wrapper,
    },
    {
        path: "/",
        component: Wrapper,
    },
    {
        path: "**",
        component: NotFoundPage
    }
];
