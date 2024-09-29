import { useState } from "react";

// eslint-disable-next-line react/prop-types
const AdminLanguageSelector = ({ onLanguageChange, className }) => {
    const [active, setActive] = useState("RU");


    const handleLanguageChange = (lang) => {
        onLanguageChange(lang);
        setActive(lang ? "TJ" : "RU");
    };

    return (
        <div>
            <div className="flex items-center justify-center">
                <button

                    className={` ${className} w-[113px] flex items-center justify-center border-r-0 rounded-l-[5px] h-[59px] py-[10px]  ${active === "RU" ? "bg-[#249D8C] text-white" : "border-[3px] border-[#249D8C] text-[#249D8C]"
                        } hover:bg-[#1e7b6a]`}
                    onClick={() => handleLanguageChange(false)}
                >
                    RU
                </button>
                <button
                    className={`w-[113px] flex items-center justify-center rounded-r-[5px] h-[59px] py-[10px]  ${active === "TJ" ? "bg-[#249D8C] text-white" : "border-[3px] border-[#249D8C] text-[#249D8C]"
                        } hover:bg-[#1e7b6a] hover:text-white`}
                    onClick={() => handleLanguageChange(true)}
                >
                    TJ
                </button>
            </div>
        </div>
    );
};

export default AdminLanguageSelector;
