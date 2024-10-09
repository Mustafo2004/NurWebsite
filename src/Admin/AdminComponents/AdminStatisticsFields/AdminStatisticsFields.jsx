import { useState, useEffect } from "react";
import AdminStatisticsButton from "../../AdminStatisticsButton/AdminStatisticsButton";
import AdminInput from "../AdminInput/AdminInput";
import AdminLanguageSelector from "../../AdminLanguageSelectoe/AdminLanguageSelectoe";
import useFetch from "../../../Hooks/Fetching";
import AdminFieldBorder from "../AdminFieldBorder/AdminFieldBorder";
import AdminButtonDelete from "../AdminButtonDelete/AdminButtonDelete";
import AdminSubmitButton from "../AdminSubmitButton/AdminSubmitButton";
import { useTranslation } from "react-i18next";

const AdminStatisticsFields = () => {
    const lng = localStorage.getItem("i18nextLng");
    const { t } = useTranslation()
    console.log(t);


    const [activeButtonStatistics, setActiveButtonStatistics] = useState(() => {
        return localStorage.getItem("activeButtonStatistics") || "adding";
    });
    console.log(activeButtonStatistics);

    if (activeButtonStatistics == "statistic") {
        window.location.reload()
    }

    useEffect(() => {
        localStorage.setItem("activeButtonStatistics", activeButtonStatistics || "adding");
    }, [activeButtonStatistics]);

    const { data, loading, error, setData } = useFetch("http://127.0.0.1:2024/get/statistics");

    const [descriptionTj, setDescriptionTj] = useState("");
    const [descriptionRu, setDescriptionRu] = useState("");
    const [value, setValue] = useState("");
    // const [isLoading, setIsLoading] = useState(false);
    const [isTajikLanguage, setIsTajikLanguage] = useState(false);

    const handleLanguage = (e) => {
        setIsTajikLanguage(e);
    };

    const handleDeleteStatistics = (itemId) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow",
            credentials: 'include',
        };

        fetch(`http://127.0.0.1:2024/delete/statistics?id=${itemId}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);

                const updatedData = data.filter(item => item.Id !== itemId);
                setData(updatedData);
            })
            .catch((error) => console.error(error));


    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const requestData = {
        value: value,
        russianstatistics: {
            description: descriptionRu,
        },
        tajikstatistics: {
            description: descriptionTj,
        },
    };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     setIsLoading(true);

    //     const requestOptions = {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(requestData),
    //         credentials: "include",
    //     };

    //     fetch("http://127.0.0.1:2024/add/statistics", requestOptions)
    //         .then((response) => response.json())
    //         .then((result) => {
    //             console.log("Success:", result);
    //         })
    //         .catch((error) => {
    //             console.error("Error:", error);
    //         })
    //         .finally(() => {
    //             setIsLoading(false);
    //         });


    // };
    function refreshPage() {
        window.location.reload(false);
    }

    return (
        <AdminFieldBorder className="flex items-end justify-between flex-col">
            <div className="pr-[40px] flex items-start justify-start">
                <div className="flex-[3]">
                    <div className="flex items-center justify-start py-[40px]">
                        <AdminStatisticsButton
                            className={`border-r-0 rounded-r-[0px] `}
                            active={activeButtonStatistics === 'adding'}
                            onClick={() => setActiveButtonStatistics('adding')}
                        >
                            {"Добавить статистику"}
                        </AdminStatisticsButton>
                        <AdminStatisticsButton
                            className="border-l-0 rounded-l-[0px]"
                            active={activeButtonStatistics === 'statistics'}
                            onClick={() => {
                                setActiveButtonStatistics('statistics');
                                refreshPage();
                            }}
                            reload
                        >
                            {"Статистика"}
                        </AdminStatisticsButton>
                    </div>

                    {activeButtonStatistics === 'adding' ? (
                        <div>
                            <form>
                                <div className="flex items-center justify-between gap-5">
                                    <div>
                                        <input
                                            value={value}
                                            type="text"
                                            placeholder="Значение"
                                            className="border-[3px] placeholder:text-[26px] pb-[10px]  h-[71px] p-5 bg-transparent rounded-[10px] w-[308px] border-[#249D8C]"
                                            onChange={(e) => setValue(e.target.value)}
                                        />
                                    </div>
                                    <div className="bg-[#D7E8E5] px-[20px] h-[109px] gap-[70px] flex items-center justify-center">
                                        {!isTajikLanguage ? (
                                            <>
                                                <AdminInput
                                                    type="text"
                                                    value={descriptionTj}
                                                    placeholder="Описание"
                                                    className="border-[3px] min-w-[686px] bg-transparent h-[71px] rounded-[10px] border-[#249D8C]"
                                                    required={true}
                                                    onChange={(e) => setDescriptionTj(e.target.value)}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <AdminInput
                                                    type="text"
                                                    value={descriptionRu}
                                                    placeholder="Описание"
                                                    className="border-[3px] w-[686px] bg-transparent h-[71px] rounded-[10px] border-[#249D8C]"
                                                    required={true}
                                                    onChange={(e) => setDescriptionRu(e.target.value)}
                                                />
                                            </>
                                        )}
                                        <AdminLanguageSelector onLanguageChange={handleLanguage} />
                                    </div>
                                </div>
                            </form>
                            <div className="items-end flex justify-end mr-[40px] relative top-[400px]">
                                <AdminSubmitButton submitData={requestData} url="http://127.0.0.1:2024/add/statistics" />
                                {/* {isLoading && <p>Loading...</p>} */}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-stat gap-5 flex-col mt-[50px]">
                            {data.map((item) => (
                                <div key={item.Id} className="flex items-center justify-between h-[83px] w-[1272px] rounded-[10px] py-[15px] px-[20px] border-[3px] border-[#249D8C]">
                                    <div className="flex items-center justify-start gap-[15px] font-normal text-[26px] text-[#999999]">
                                        <p>{item.value}</p>
                                        <span className="w-[29px] border-[2px] rotate-90 border-[#249D8C]"></span>
                                        <p>{lng === "ru" ? item.russianstatistics.description : item.tajikstatistics.description}</p>
                                    </div>
                                    <AdminButtonDelete onClick={() => handleDeleteStatistics(item.Id)} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

        </AdminFieldBorder >
    );
};

export default AdminStatisticsFields;
