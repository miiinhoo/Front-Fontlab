import { lazy } from "react"


const UserLogin = lazy(() => import("../../pages/user/UserLogin"));
const UserSignup = lazy(() => import("../../pages/user/UserSignup"));

// 회원정보수정페이지
const EditPage = lazy(() => import("../../pages/user/EditPage"));

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
        path:"edit",
        element: <EditPage/>,
    },
];
export default UserRouter;