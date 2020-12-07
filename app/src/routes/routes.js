import {Route, Switch} from "react-router-dom";
import Wrapper from "../components/DataWrapper";
import React from "react";
import NotFoundPage from "../components/NotFoundPage";

export const routes = [
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
