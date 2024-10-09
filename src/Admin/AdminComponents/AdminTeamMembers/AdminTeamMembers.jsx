import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../Hooks/Fetching";
import AdminFieldBorder from "../AdminFieldBorder/AdminFieldBorder";
import trashwhite from "../../../assets//Icons/trashwhite.png"

const AdminTeamMembers = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    console.log(t);
    const { i18n } = useTranslation();
    const { teamId } = useParams();
    console.log(useParams())
    console.log("dafsfda", teamId);
    const { data, loading, error, setData } = useFetch(`http://127.0.0.1:2024/get/one/team/member?id=${teamId}`);


    const handleDeleteStatistics = (itemId) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow",
            credentials: 'include',
        };

        fetch(`http://127.0.0.1:2024/delete/team/member?id=${itemId}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                navigate("/team");

                const updatedData = data.filter(item => item.Id !== itemId);
                setData(updatedData);
            })
            .catch((error) => console.error(error));


    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <AdminFieldBorder className="pl-[0px] pb-0 ">

            <div>
                <div className="flex items-center justify-between my-[40px] px-[40px]">
                    <Link to="/team">
                        <button className="w-[202px] text-[#249D8C] font-semibold text-[26px] h-[66px] rounded-[5px] border-[3px] border-[#249D8C] ">

                            Назад
                        </button>
                    </Link>
                    <button onClick={() => handleDeleteStatistics(data.Id)} className="bg-[#FF6262] gap-[15px] rounded-[5px] text-[#FFFFFF] font-normal text-[30px] border-[3px] border-[#FF6262] flex items-center justify-center h-[63px] w-[308px]">

                        <img src={trashwhite} alt="" />
                        Delete
                    </button>
                </div>
                {/*  */}
                <div className="w-full  border-[3px] border-[#249D8C] rounded-[10px]">
                    <div className="flex items-start justify-start gap-[40px]">
                        <div className="w-[658px] h-[722px] border-[#249D8C]  overflow-hidden  border  rounded-[5px]">
                            <img src={`http://127.0.0.1:2024/read/file?Path=${data.Photo}`} alt="dfsa" className=" h-full" />
                        </div>
                        <div className="font-semibold mt-[40px]">
                            <div>
                                <p className="text-[#303C3A] font-semibold text-[40px] max-w-[718px]">
                                    {i18n.language === "ru" ? data.russianmembers?.name_surname : data.tajikmembers?.name_surname}
                                </p>
                                <p className="text-[#26776C] text-[28px] max-w-[718px]">
                                    {i18n.language === "ru" ? data.russianmembers?.specialization : data.tajikmembers?.specialization}
                                </p>
                            </div>
                            <div className="mt-[30px] flex-col flex gap-[40px]">

                                <div>
                                    <h1 className="text-[#26776C] text-[26px]">{t("Admin.Member.education")}</h1>
                                    <p className="font-normal text-[20px] text-[#303C3A]">{i18n.language === "ru" ? data.russianmembers?.specialization : data.tajikmembers?.specialization}</p>
                                    <p className="font-normal text-[20px] text-[#303C3A]"><span className="text-[#26776C]">Специализация:</span>{i18n.language === "ru" ? data.russianmembers?.specialization : data.tajikmembers?.specialization}</p>
                                </div>
                                <div>
                                    <h1 className="text-[#26776C] text-[26px]">{t("Admin.Member.expirence")}</h1>
                                    <p className="font-normal text-[20px] text-[#303C3A]">{i18n.language === "ru" ? data.russianmembers?.specialization : data.tajikmembers?.specialization}</p>
                                </div>
                                <div>

                                    <h1 className="text-[#26776C] text-[26px]">{t("Admin.Member.contact")}</h1>
                                    <div className="flex items-start justify-srart gap-[50px]">
                                        <div className="font-medium text-[20px] text-[#26776C] w-[192px]">
                                            <p>{t("Admin.Member.phone")}</p>
                                            <p>{t("Admin.Member.emil")}</p>
                                            <p>{t("Admin.Member.worktime")}</p>
                                        </div>
                                        <div>
                                            <p className="font-normal text-[20px] text-[#303C3A]">{i18n.language === "ru" ? data.russianmembers?.specialization : data.tajikmembers?.specialization}</p>
                                            <p className="font-normal text-[20px] text-[#303C3A]">{i18n.language === "ru" ? data.russianmembers?.specialization : data.tajikmembers?.specialization}</p>
                                            <p className="font-normal text-[20px] text-[#303C3A]">{i18n.language === "ru" ? data.russianmembers?.specialization : data.tajikmembers?.specialization}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminFieldBorder >
    );
};

export default AdminTeamMembers;
