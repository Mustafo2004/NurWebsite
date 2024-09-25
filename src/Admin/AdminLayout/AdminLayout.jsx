import { Outlet, useLocation } from "react-router-dom";
import AdminHeader from "../AdminComponents/AdminHeader/AdminHeader";
import AdminNavbar from "../AdminComponents/AdminNavbar/AdminNavbar";

const AdminLayout = () => {
    const location = useLocation();
    const hideNavbarRoutes = ['/login', '/signin', '/updatePassword', '/updateCode'];

    return (
        <div className="bg-[#F4FCF8] pt-[50px] flex">
            <div className="flex flex-col flex-grow">
                <AdminHeader />
                <div className="flex flex-grow">
                    {!hideNavbarRoutes.includes(location.pathname) && <AdminNavbar />}
                    <div className="flex-grow">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;
