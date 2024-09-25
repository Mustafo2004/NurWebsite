import { useEffect, useState } from "react";
import AdminFieldBorder from "../AdminComponents/AdminFieldBorder/AdminFieldBorder"
import AdminStatisticsButton from "../AdminStatisticsButton/AdminStatisticsButton"
import AdminSubmitButton from "../AdminComponents/AdminSubmitButton/AdminSubmitButton";
import AdminButtonDelete from "../AdminComponents/AdminButtonDelete/AdminButtonDelete";
import { useTranslation } from "react-i18next";
import useFetch from "../../Hooks/Fetching"
import DeleteData from "../../Hooks/DeleteData"
import AdminInput from "../AdminComponents/AdminInput/AdminInput"
import AdminLanguageSelectoe from "../AdminLanguageSelectoe/AdminLanguageSelectoe"
import { Link } from "react-router-dom";


const AdminTeamPage = () => {
    const [activeButton, setActiveButton] = useState(() => {
        return localStorage.getItem("activeButton") || "addTeam";
    });
    useEffect(() => {

        localStorage.setItem("activeButton", activeButton);
    }, [activeButton]);

    useEffect(() => {
        const storedButton = localStorage.getItem("activeButton");
        if (storedButton) {
            setActiveButton(storedButton);
        }
    }, []);
    const { t } = useTranslation();
    console.log(t);

    const lng = localStorage.getItem("i18nextLng");

    const [isTajikLanguage, setIsTajikLanguage] = useState(false);
    const [NameTj, setNameTj] = useState("");
    const [NameRu, setNameRU] = useState("");
    const [proffesionTj, setProffesionTj] = useState("");
    const [proffesionRu, setProffesionRu] = useState("");
    const [education, setEducation] = useState()

    useEffect(() => {

        localStorage.setItem("activeButton", activeButton);
    }, [activeButton]);
    const { data, loading, error } = useFetch("http://127.0.0.1:2024/get/team/member");
    const { deleteData, response, loadingDelete, errorDelete } = DeleteData("http://127.0.0.1:2024/delete/statistics");


    useEffect(() => {
        if (response) {
            console.log("Deleted successfully:", response);
        }
    }, [response]);

    const handleLanguage = (e) => {
        setIsTajikLanguage(e);
    };

    const handleDeleteStatistics = (itemId) => {
        const data = { reason: "No longer needed", id: itemId };
        deleteData(data);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const handleSubmit = async () => {
        const requestData = {
            russianstatistics: {
                Name: NameRu,
                Surname: proffesionRu,
                education: education
            },
            tajikstatistics: {
                value: NameTj,
                description: proffesionTj
            }
        };

        const response = await fetch("http://127.0.0.1:2024/add/statistics", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData),
            credentials: "include"
        });

        if (response.ok) {
            console.log("Submission successful");
        } else {
            console.error("Submission failed");
        }
    };
    return (
        <div>
            <AdminFieldBorder>
                <div className="flex items-center justify-start my-[40px]">
                    <AdminStatisticsButton
                        className="border-r-0 rounded-r-none"
                        active={activeButton === "addTeam"}
                        onClick={() => setActiveButton("addTeam")}
                    >
                        Добавить специалиста
                    </AdminStatisticsButton>
                    <AdminStatisticsButton
                        className="border-l-0 rounded-l-none"
                        active={activeButton === "team"}
                        onClick={() => setActiveButton("team")}
                    >
                        Команда
                    </AdminStatisticsButton>
                </div>
                <div>
                    {activeButton === 'addTeam' ? (
                        <div>
                            <div className="flex items-center justify-center gap-5 h-fit">

                                <div className="bg-[#D7E8E5] pl-[20px] pr-[40px] rounded-l-[10px] py-[15px]   flex items-center justify-start mt-[39px] gap-[69px]">
                                    {!isTajikLanguage ? (
                                        <div className="flex items-center justify-center gap-5 flex-col">
                                            <AdminInput
                                                value={NameRu}
                                                type="text"
                                                placeholder="Имя"
                                                className="border-[3px] w-[1024px] bg-transparent h-[71px] rounded-[10px] border-[#249D8C]"
                                                required={true}
                                                onChange={(e) => setNameRU(e.target.value)}
                                            />
                                            <AdminInput
                                                value={proffesionTj}
                                                type="text"
                                                placeholder="Профессия"
                                                className="border-[3px] w-[1024px] bg-transparent h-[71px] rounded-[10px] border-[#249D8C]"
                                                required={true}
                                                onChange={(e) => setProffesionTj(e.target.value)}
                                            />
                                            <AdminInput
                                                type="text"
                                                placeholder="Образование"
                                                className="border-[3px] w-[1024px] bg-transparent h-[71px] rounded-[10px] border-[#249D8C]"
                                                required={true}
                                                onChange={(e) => setEducation(e.target.value)}
                                            />
                                            <AdminInput
                                                type="text"
                                                placeholder="Специализация"
                                                className="border-[3px] w-[1024px] bg-transparent h-[71px] rounded-[10px] border-[#249D8C]"
                                                required={true}
                                                onChange={(e) => setNameTj(e.target.value)}
                                            />
                                            <AdminInput
                                                type="text"
                                                placeholder="Опыт работы"
                                                className="border-[3px] w-[1024px] bg-transparent h-[71px] rounded-[10px] border-[#249D8C]"
                                                required={true}
                                                onChange={(e) => setNameTj(e.target.value)}
                                            />
                                            <AdminInput
                                                type="text"
                                                placeholder="Специализация"
                                                className="border-[3px] w-[1024px] bg-transparent h-[71px] rounded-[10px] border-[#249D8C]"
                                                required={true}
                                                onChange={(e) => setNameTj(e.target.value)}
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center gap-5 flex-col">

                                            <AdminInput
                                                type="text"
                                                placeholder="ОписаниеTJ"
                                                className="border-[3px] w-[1024px] bg-transparent h-[71px] rounded-[10px] border-[#249D8C]"
                                                required={true}
                                                onChange={(e) => setProffesionTj(e.target.value)}
                                            />
                                            <AdminInput
                                                type="text"
                                                placeholder="ОписаниеTJ"
                                                className="border-[3px]  w-[1024px] bg-transparent h-[71px] rounded-[10px] border-[#249D8C]"
                                                required={true}
                                                onChange={(e) => setProffesionRu(e.target.value)}
                                            />
                                        </div>
                                    )}
                                    <AdminLanguageSelectoe onLanguageChange={handleLanguage} />
                                </div>
                            </div>
                            <div className="items-end flex justify-end mr-[40px] my-[400px  ]">
                                <AdminSubmitButton submitData={handleSubmit} url="http://127.0.0.1:2024/add/statistics" />
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-stat gap-5 flex-col mt-[50px]">
                            {data.map((item) => (
                                <Link key={item.id} to={`/members/${item.id}`}>
                                    <div className="flex cursor-pointer items-center justify-between h-[83px] w-[1272px] rounded-[10px] py-[15px] px-[20px] border-[3px] border-[#249D8C]">
                                        <div className="flex items-center justify-center gap-[15px] font-normal text-[26px] text-[#999999]">
                                            <p>{lng === "ru" ? item.russianmembers.name_surname : item.tajikmembers.name_surname}</p>
                                            <span className="w-[29px] border-[2px] rotate-90 border-[#249D8C]"></span>
                                            {/* <p>{lng === "ru" ? item.russianmembers.specialization : item.tajikmembers.specialization}</p> */}
                                        </div>
                                        <AdminButtonDelete
                                            onClick={() => handleDeleteStatistics(item.id)}
                                            disabled={loadingDelete}
                                        />
                                    </div>
                                </Link>

                            ))}
                            {errorDelete && <p>Error: {errorDelete}</p>}
                        </div>
                    )}


                </div>

            </AdminFieldBorder>
        </div>
    )
}

export default AdminTeamPage
