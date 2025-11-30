import { lazy } from "react";

const PlaygroundPage = lazy(() => import("../pages/playground/PlaygroundPage"));

const PlaygroundRouter = [
    {
        index:true,
        element:<PlaygroundPage/>
    }
]