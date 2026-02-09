import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout";
import { lazy } from "react";
import UserRouter from "./user/UserRouter";

const MainPage = lazy(() => import("../pages/MainPage"));
const ExplorePage = lazy(() => import("../pages/explore/ExplorePage"));
const PlaygroundPage = lazy(() => import("../pages/playground/PlaygroundPage"));
const PlaygroundList = lazy(() => import("../pages/playground/PlaygroundList"));
const PlaygroundSettings = lazy(() => import("../pages/playground/PlaygroundSettings"));





const root = createBrowserRouter([

    {
        path:"",
        element:<BasicLayout/>,
        children:[
            {
                index:true,
                element: <Navigate replace to ="/explore"/>
            },
            {
                path:"explore",
                element:<ExplorePage/>,
            },
            {
                path: "playground",
                element: <PlaygroundPage />,
                children: [
            {
                index: true, // /playground 접근 시
                element: <Navigate to="list" replace />, // 자동 리디렉트
            },
            {
                path: "list",
                element: <PlaygroundList />,
            },
            {
                path: "settings/:id",
                element: <PlaygroundSettings />,
            },
            ],
            },
            {
                path:"user",
                element:<Outlet/>,
                children: [...UserRouter],
            }
        ]
    }
]);
export default root;