import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout";
import { lazy } from "react";
import UserRouter from "./user/UserRouter";

<<<<<<< HEAD
const MainPage = lazy(() => import("../pages/MainPage"));
=======
>>>>>>> second
const ExplorePage = lazy(() => import("../pages/explore/ExplorePage"));
const PlaygroundPage = lazy(() => import("../pages/playground/PlaygroundPage"));
const PlaygroundList = lazy(() => import("../pages/playground/PlaygroundList"));
const PlaygroundSettings = lazy(() => import("../pages/playground/PlaygroundSettings"));

<<<<<<< HEAD
=======
// 마이페이지
const MyPage = lazy(() => import("../pages/user/MyPage"));
>>>>>>> second



const root = createBrowserRouter([

    {
        path:"",
        element:<BasicLayout/>,
        children:[
            {
<<<<<<< HEAD
                index:true,
                element:<MainPage/>,
            },
            {
=======
>>>>>>> second
                path:"explore",
                element:<ExplorePage/>,
            },
            {
<<<<<<< HEAD
=======
                path:"mypage",
                element:<MyPage/>,
            },
            {
>>>>>>> second
                path: "playground",
                element: <PlaygroundPage />,
                children: [
            {
                index: true, // /playground 접근 시
                element: <Navigate to="list" replace />, // 자동 리디렉트
            },
<<<<<<< HEAD
=======
            
>>>>>>> second
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