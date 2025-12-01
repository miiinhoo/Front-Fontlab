import { lazy } from "react"


const UserLogin = lazy(() => import("../../pages/user/UserLogin"));
const UserSignup = lazy(() => import("../../pages/user/UserSignup"));
const MyPage = lazy(() => import("../../pages/user/MyPage"));

const UserRouter = [
    {
        path:"login",
        element:<UserLogin/>,
    },
    {
        path:"signup",
        element:<UserSignup/>,
    },
    {
        path:"mypage",
        element:<MyPage/>,
    },
];
export default UserRouter;