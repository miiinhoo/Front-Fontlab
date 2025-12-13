import { lazy } from "react"


const UserLogin = lazy(() => import("../../pages/user/UserLogin"));
const UserSignup = lazy(() => import("../../pages/user/UserSignup"));

const UserRouter = [
    {
        path:"login",
        element:<UserLogin/>,
    },
    {
        path:"signup",
        element:<UserSignup/>,
    },
];
export default UserRouter;