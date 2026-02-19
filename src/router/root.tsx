import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout";
import { lazy } from "react";
import UserRouter from "./user/UserRouter";
import RouterGuard from "./guard/RouterGuard";
import AuthLayout from "../layouts/AuthLayout";

const ExplorePage = lazy(() => import("../pages/explore/ExplorePage"));
const PlaygroundPage = lazy(() => import("../pages/playground/PlaygroundPage"));
const PlaygroundList = lazy(() => import("../pages/playground/PlaygroundList"));
const PlaygroundSettings = lazy(() => import("../pages/playground/PlaygroundSettings"));





const root = createBrowserRouter([
    // 기본 홈페이지 탭
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
                element: (
                    <RouterGuard>
                        <PlaygroundPage />
                    </RouterGuard>
                ),
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
            
        ]
    },
    // 로그인/회원가입 탭
    {
        path:"user",
        element:<AuthLayout/>,
        children: [...UserRouter],
    }
]);
export default root;