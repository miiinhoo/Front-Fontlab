import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout";
import { lazy } from "react";

const MainPage = lazy(() => import("../pages/MainPage"));
const ExplorePage = lazy(() => import("../pages/explore/ExplorePage"));
const PlaygroundPage = lazy(() => import("../pages/playground/PlaygroundPage"));
const PlaygroundSettings = lazy(() => import("../pages/playground/PlaygroundSettings"));

const LibraryPage = lazy(() => import("../pages/LibraryPage"));


const root = createBrowserRouter([

    {
        path:"",
        element:<BasicLayout/>,
        children:[
            {
                index:true,
                element:<MainPage/>,
            },
            {
                path:"explore",
                element:<ExplorePage/>,
            },
            {
                path:"playground",
                element:<PlaygroundPage/>,
                children:[
                    {
                        path:"settings",
                        element:<PlaygroundSettings/>
                    }
                ]
            },
            {
                path:"library",
                element:<LibraryPage/>,
            }
        ]
    }
]);
export default root;