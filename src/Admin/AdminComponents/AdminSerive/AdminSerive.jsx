import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../Hooks/Fetching";
import trashwhite from "../../../assets/Icons/trashwhite.png"
import AdminFieldBorder from "../AdminFieldBorder/AdminFieldBorder";
import { useTranslation } from "react-i18next";

const AdminSerive = () => {
    const { data, loading, error, setData } = useFetch("http://127.0.0.1:2024/get/services");
    // const lng = localStorage.getItem("i18nextLng");
    const { sericeId } = useParams();
    const item = data && data.find(each => String(each.Id) === String(sericeId));
    // console.log("sadf", item.TajikServices, "FInd");

    const navigate = useNavigate();
    const { t } = useTranslation()
    const { i18n } = useTranslation();
    const handleDeleteStatistics = (itemId) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow",
            credentials: 'include',
        };

        fetch(`http://127.0.0.1:2024/delete/services?id=${itemId}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                navigate("/services");
                const updatedData = data.filter(item => item.Id !== itemId);
                setData(updatedData);
            })
            .catch((error) => console.error(error));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!item) return <p>No team member found.</p>;
    return (
        <div>
            <AdminFieldBorder className="pl-[0px] pr-0 pb-0">

                <div className="flex items-center justify-between my-[40px] px-[40px]">
                    <Link to="/services">
                        <button className="w-[202px] text-[#249D8C] font-semibold text-[26px] h-[66px] rounded-[5px] border-[3px] border-[#249D8C] ">

                            Назад
                        </button>
                    </Link>
                    <button onClick={() => handleDeleteStatistics(item.Id)} className="bg-[#FF6262] gap-[15px] rounded-[5px] text-[#FFFFFF] font-normal text-[30px] border-[3px] border-[#FF6262] flex items-center justify-center h-[63px] w-[308px]">

                        <img src={trashwhite} alt="" />
                        Delete
                    </button>
                </div>
                <div className="border-[#249D8C] border-[3px] rounded-[10px] w-full h-full py-[40px] pl-[40px]">
                    <div className="w-[1063px]">
                        <div>

                            <h1 className="font-semibold text-[#303C3A] text-[40px]">{t("Admin.Services.services")}</h1>
                            <p className="font-normal text-[20px] text-[#303C3A] my-[30px]">{i18n === "ru" ? item.RussianServices.description : item.TajikServices.description}</p>
                        </div>
                        <div className="flex flex-col gap-[30px]">

                            <div>
                                <h1 className="text-[#26776C] mb-[15px] font-semibold text-[28px]">{t("Admin.Services.consistencies")}</h1>
                                <ul className="list-disc pl-[24px] text-[#303C3A] font-normal text-[20px]">
                                    <li>
                                        Артикуляционные массажи для детей
                                    </li>
                                    <li>
                                        Артикуляционные массажи для детей
                                    </li>
                                    <li>
                                        Артикуляционные массажи для детей
                                    </li>
                                    <li>
                                        Артикуляционные массажи для детей
                                    </li>
                                    <li>
                                        Артикуляционные массажи для детей
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h1 className="text-[#26776C] mb-[15px] font-semibold text-[28px]">{t("Admin.Services.specialists")}</h1>
                                <ul className="list-disc pl-[24px] text-[#303C3A] font-normal text-[20px]">
                                    {i18n.language === "ru"
                                        ? item.RussianServices.specialists.map((specialist) => (
                                            <li key={specialist.id} className="font-normal text-[20px] text-[#303C3A]">
                                                {specialist}
                                            </li>
                                        ))
                                        : item.TajikServices.specialists.map((specialist) => (
                                            <li key={specialist.id} className="font-normal text-[20px] text-[#303C3A]">
                                                {specialist}
                                            </li>
                                        ))
                                    }
                                </ul>

                            </div>
                            <div>
                                <div className="flex items-start justify-srart gap-[50px]">
                                    <div className="font-medium text-[20px] text-[#26776C] w-[192px]">
                                        <p>{t("Admin.Member.phone")}</p>
                                        <p>{t("Admin.Member.emil")}</p>
                                        <p>{t("Admin.Member.worktime")}</p>
                                    </div>
                                    <div>
                                        <p className="font-normal text-[20px] text-[#303C3A]">{i18n.language === "ru" ? item.RussianMembers?.specialization : item.TajikMembers?.specialization}</p>
                                        <p className="font-normal text-[20px] text-[#303C3A]">{i18n.language === "ru" ? item.RussianMembers?.specialization : item.TajikMembers?.specialization}</p>
                                        <p className="font-normal text-[20px] text-[#303C3A]">{i18n.language === "ru" ? item.RussianMembers?.specialization : item.TajikMembers?.specialization}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminFieldBorder >
        </div >
    )
}

export default AdminSerive
