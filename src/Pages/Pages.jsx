import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MainLayout from "../Layout/MainLayout"
import AdminLayaout from "../Admin/AdminLayout/AdminLayout"
import SignIn from "../Admin/AdminComponents/SignIn/SignIn";
import AdminPages from "../Admin/AdminPages/AdminPages";
import Login from "../Admin/AdminComponents/Login/Login";
import UpdatePassword from "../Admin/AdminComponents/UpdatePassword/UpdatePassword";
import ADminUpdateCode from "../Admin/AdminComponents/ADminUpdateCode/ADminUpdateCode";

import AdminPartners from "../Admin/AdminPages/AdminPartners";
import AdminStatististic from "../Admin/AdminPages/AdminStatististic";
import AdminProjectsPages from "../Admin/AdminPages/AdminProjectsPages";
import AdminTeamPage from "../Admin/AdminPages/AdminTeamPage";
import AdminTeamMembers from "../Admin/AdminComponents/AdminTeamMembers/AdminTeamMembers";
import AdminNewsPage from "../Admin/AdminPages/AdminNewsPage";
import AdminServicesPage from "../Admin/AdminPages/AdminServicesPage";
import AdminSerive from "../Admin/AdminComponents/AdminSerive/AdminSerive";
import AdminNew from "../Admin/AdminComponents/AdminNew/AdminNew";
const USER_TYPES = {
    PUBLIC: "Public User",
    NORMAL_USER: "Normal user",
    ADMIN_USER: "Admin User"
};
const CURRENT_USER_TYPE = USER_TYPES.ADMIN_USER;
const Pages = () => {
    const CustomerRouter = createBrowserRouter([
        {
            path: "/",
            element: <AdminLayaout />,
            children: [
                {
                    path: "/admin",
                    element: <AdminElement><AdminPages /></AdminElement>
                },
                {
                    path: "/signin",
                    element: <AdminElement><SignIn /></AdminElement>
                },
                {
                    path: "/login",
                    element: <AdminElement><Login /></AdminElement>
                },
                {
                    path: "/updatePassword",
                    element: <AdminElement><UpdatePassword /></AdminElement>
                },
                {
                    path: "/updatecode",
                    element: <AdminElement><ADminUpdateCode /></AdminElement>
                },
                {
                    path: "/statisticadd",
                    element: <AdminElement><AdminStatististic /></AdminElement>
                },
                {
                    path: "/partners",
                    element: <AdminElement><AdminPartners /></AdminElement>
                },
                {
                    path: "/services",
                    element: <AdminElement><AdminServicesPage /></AdminElement>
                },
                {
                    path: "/projects",
                    element: <AdminElement><AdminProjectsPages /></AdminElement>
                },
                {
                    path: "/team",
                    element: <AdminElement><AdminTeamPage /></AdminElement>
                },
                {
                    path: "/team/:teamId",
                    element: <AdminElement><AdminTeamMembers /></AdminElement>
                },
                {
                    path: "/news",
                    element: <AdminElement><AdminNewsPage /></AdminElement>
                },
                {
                    path: "/services/:sericeId",
                    element: <AdminElement><AdminSerive /></AdminElement>
                },
                {
                    path: "/news/:newId",
                    element: <AdminElement><AdminNew /></AdminElement>
                },
                // {
                //     path: "newId",
                //     element: <AdminElement><AdminNew /></AdminElement>
                // },

            ]

        },
        {
            path: "/",
            element: <MainLayout />,
        }
    ])
    return <RouterProvider router={CustomerRouter} />;
}
// eslint-disable-next-line react/prop-types
function AdminElement({ children }) {
    if (CURRENT_USER_TYPE === USER_TYPES.ADMIN_USER) {
        return <div className="px-[50px] py-[40px] bg-[#F4FCF8] min-h-[1080px] ">{children}</div>;
    } else {
        return <div>You do not have access to this page!</div>;
    }
}

export default Pages
