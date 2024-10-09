import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../Hooks/Fetching";
import trashwhite from "../../../assets/Icons/trashwhite.png"
import AdminFieldBorder from "../AdminFieldBorder/AdminFieldBorder";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useState } from "react";




const AdminSerive = () => {
    // const lng = localStorage.getItem("i18nextLng");
    const { sericeId } = useParams();
    const [userDate, setUserDate] = useState([]);
    console.log("USerData", userDate);


    const { data, loading, error, setData } = useFetch(`http://127.0.0.1:2024/get/one/service?id=${sericeId}`);
    // console.log("sadf", item.TajikServices, "FInd");
    const { team } = useFetch("http://127.0.0.1:2024/get/team/member");
    // console.log(team);



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
    useEffect(() => {
        if (data.length !== 0) {
            // console.log("fasdhhs",data.RussianServices.specialists);
            const df = data.RussianServices.specialists.map((itemid) => {

                const updatedData = team.filter(item => item.Id == itemid)
                // console.log("fasdhhs",itemid)
                // console.log("fasdhhs",updatedData)
                return updatedData[0]
            })
            setUserDate(df)
        }

    }, [data])
    // console.log("fasdhhs", data.RussianServices);

    // console.log("Catch data", data.RussianServices.specialists.map((item) => {
    //     return (
    //         item.specialists
    //     )
    // }));

    // console.log("sadas",userDate);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return (
        <div>
            <AdminFieldBorder className="pl-[0px] pr-0 pb-0">

                <div className="flex items-center justify-between my-[40px] px-[40px]">
                    <Link to="/services">
                        <button className="w-[202px] text-[#249D8C] font-semibold text-[26px] h-[66px] rounded-[5px] border-[3px] border-[#249D8C] ">

                            Назад
                        </button>
                    </Link>
                    <button onClick={() => handleDeleteStatistics(data.Id)} className="bg-[#FF6262] gap-[15px] rounded-[5px] text-[#FFFFFF] font-normal text-[30px] border-[3px] border-[#FF6262] flex items-center justify-center h-[63px] w-[308px]">

                        <img src={trashwhite} alt="" />
                        Delete
                    </button>
                </div>
                <div className="border-[#249D8C] relative border-[3px] overflow-hidden rounded-[10px] w-full h-full py-[40px] pl-[40px]">
                    <div className="w-[1063px]  ">
                        <div>

                            <h1 className="font-semibold text-[#303C3A] text-[40px]">{t("Admin.Services.services")}</h1>
                            <p className="font-normal text-[20px] text-[#303C3A] my-[30px]">{i18n === "ru" ? data.RussianServices.description : data.TajikServices.description}</p>
                        </div>
                        <div className="flex flex-col gap-[30px]">

                            <div>
                                <h1 className="text-[#26776C] mb-[15px] font-semibold text-[28px]">{t("Admin.Services.consistencies")}</h1>
                                <ul className="list-disc pl-[24px] text-[#303C3A] font-normal text-[20px]">
                                    {i18n.language === "ru"
                                        ? data.RussianServices.servicecontents.map((services) => (
                                            <li key={services.id} className="font-normal text-[20px] text-[#303C3A]">
                                                {services}
                                            </li>
                                        ))
                                        : data.TajikServices.servicecontents.map((services) => (
                                            <li key={services.id} className="font-normal text-[20px] text-[#303C3A]">
                                                {services}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="w-[1063px] ">
                                    <div>
                                        <h1 className="text-[#26776C] mb-[15px] font-semibold text-[28px]">{t("Admin.Services.specialists")}</h1>
                                        <ul className="list-disc pl-[24px] text-[#303C3A] font-normal text-[20px]">
                                            {console.log("USerData", userDate)}
                                            {i18n.language === "ru"
                                                ?
                                                userDate.map((specialist) => (


                                                    <li key={specialist.Id} className="font-normal text-[20px] text-[#303C3A]">
                                                        {specialist.russianmembers.name_surname}
                                                    </li>

                                                ))
                                                : userDate.map((specialist) => (
                                                    <li key={specialist.Id} className="font-normal text-[20px] text-[#303C3A]">
                                                        {/* {specialist.tajikmembers.name_surname} */}

                                                    </li>
                                                ))

                                            }
                                        </ul>
                                    </div>
                                    <div>
                                        <div className="flex items-start justify-srart gap-[50px] w-[1063px]">
                                            <div className="font-medium text-[20px] text-[#26776C] w-[192px]">
                                                <p>{t("Admin.Member.date")}</p>
                                                <p>{t("Admin.Member.duration")}</p>
                                                <p>{t("Admin.Member.contactthwo")}</p>
                                            </div>
                                            <div>
                                                <p className="font-normal text-[20px] text-[#303C3A]">{data.dates}</p>
                                                <p className="font-normal text-[20px] text-[#303C3A]">{data.Email}</p>
                                                <p className="font-normal text-[20px] text-[#303C3A]">{data.phone}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute h-[717px] right-0 top-0 z-0">
                                    <img src={`http://127.0.0.1:2024/read/file?Path=${data.Photo}`} alt="" className="w-[500px] h-full" />
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
