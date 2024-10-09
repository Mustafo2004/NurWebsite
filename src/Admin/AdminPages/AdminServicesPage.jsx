import { useTranslation } from "react-i18next";
import AdminFieldBorder from "../AdminComponents/AdminFieldBorder/AdminFieldBorder"
import AdminStatisticsButton from "../AdminStatisticsButton/AdminStatisticsButton"
import { useEffect, useState } from "react";
import useFetch from "../../Hooks/Fetching";
import AdminButtonDelete from "../AdminComponents/AdminButtonDelete/AdminButtonDelete";
import { Link } from "react-router-dom";
import AdminSeriviceAdding from "../AdminComponents/AdminSeriviceAdding/AdminSeriviceAdding";



const AdminServicesPage = () => {
    const { t } = useTranslation();
    console.log(t);

    const lng = localStorage.getItem("i18nextLng");

    const [activeButtonServicing, setActiveButtonServicing] = useState(() => {
        return localStorage.getItem("activeButtonServicing") || "addingService";
    });
    useEffect(() => {

        localStorage.setItem("activeButtonServicing", activeButtonServicing);
    }, [activeButtonServicing]);
    const { data, loading, error, setData } = useFetch("http://127.0.0.1:2024/get/services");






    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

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

                const updatedData = data.filter(item => item.Id !== itemId);
                setData(updatedData);
            })
            .catch((error) => console.error(error));
    };
    function refreshPage() {
        window.location.reload(false);
    }


    return (
        <AdminFieldBorder className="flex items-start justify-between flex-col">
            <div className="pr-[40px]">
                <div className="flex-[3]">
                    <div className="flex items-center justify-start py-[40px]">
                        <AdminStatisticsButton
                            className="border-r-0 rounded-r-[0px]"
                            active={activeButtonServicing === 'addingService'}
                            onClick={() => setActiveButtonServicing('addingService')}
                        >
                            {"Добавить услугу"}
                        </AdminStatisticsButton>
                        <AdminStatisticsButton
                            className="border-l-0 rounded-l-[0px]"
                            active={activeButtonServicing === 'statistics'}
                            onClick={() => {

                                setActiveButtonServicing('statistics')
                                refreshPage()
                            }
                            }
                        >
                            {"Услуги"}

                        </AdminStatisticsButton>
                    </div>

                    {activeButtonServicing === 'addingService' ? (
                        <div>
                            <AdminSeriviceAdding />
                        </div>
                    ) : (
                        <div className="flex items-stat gap-5 flex-col mt-[50px]">
                            {data.map((item) => (
                                <div key={item.Id} className="flex   items-center justify-between h-[83px] w-[1272px] rounded-[10px] py-[15px] px-[20px] border-[3px] border-[#249D8C]">
                                    <div className="w-full">

                                        <div className="">
                                            <Link to={`/services/${item.Id}`} className="w-full">
                                                <div className="flex items-center justify-start w-full gap-[15px] font-normal text-[26px] text-[#999999]">
                                                    <p>{lng === "ru" ? item.RussianServices.title : item.TajikServices.title}</p>
                                                    <span className="w-[29px] border-[2px] rotate-90 border-[#249D8C]"></span>
                                                    <p>{lng === "ru" ? item.RussianServices.description : item.TajikServices.description}</p>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                    <AdminButtonDelete onClick={() => handleDeleteStatistics(item.Id)} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AdminFieldBorder>
    )
}

export default AdminServicesPage
