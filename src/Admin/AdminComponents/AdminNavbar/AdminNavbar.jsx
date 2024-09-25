import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

const AdminNavbar = () => {
    const location = useLocation();
    const [activeButton, setActiveButton] = useState('statistics');

    const navItems = [
        { path: "/statisticadd", label: "Статистика" },
        { path: "/partners", label: "Партнеры" },
        { path: "/services", label: "Услуги" },
        { path: "/projects", label: "Проекты" },
        { path: "/team", label: "Команда" },
        { path: "/news", label: "Новости" }
    ];

    useEffect(() => {
        const currentPath = location.pathname;
        const activeItem = navItems.find(item => item.path === currentPath);
        if (activeItem) {
            setActiveButton(activeItem.label.toLowerCase());
        } else {
            setActiveButton('statistics');
        }
    }, [location.pathname]);

    const renderNavItem = (path, label) => (
        <NavLink
            key={path}
            to={path}
            className={`h-[80px] w-[348px] flex items-center justify-center text-[#303C3A] rounded-[10px] px-[66px] font-semibold text-[32px] ${activeButton === label.toLowerCase() ? 'bg-[#249D8C] text-[#FFFFFF]' : 'border-[3px] border-[#249D8C]'}`}
            onClick={() => setActiveButton(label.toLowerCase())}
        >
            {label}
        </NavLink>
    );

    return (
        <div className="pl-[50px] mt-[40px]">
            <ul className="flex items-start justify-start gap-[20px] flex-col">
                {navItems.map(item => renderNavItem(item.path, item.label))}
            </ul>
        </div>
    );
}

export default AdminNavbar;
