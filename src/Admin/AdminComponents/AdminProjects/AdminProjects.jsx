import { useEffect, useState } from "react";
import AdminStatisticsButton from "../../AdminStatisticsButton/AdminStatisticsButton";
import useFetch from "../../../Hooks/Fetching";
// import AdminButtonDelete from "../AdminButtonDelete/AdminButtonDelete";
import { useTranslation } from "react-i18next";
import AdminInput from "../AdminInput/AdminInput";
import AdminLanguageSelector from "../../AdminLanguageSelectoe/AdminLanguageSelectoe";
import AdminSubmitButton from "../AdminSubmitButton/AdminSubmitButton";
import AdminButtonDelete from "../AdminButtonDelete/AdminButtonDelete";

const AdminProjects = () => {
    const [projectName, setProjectName] = useState("");
    const [projectNameTj, setProjectNameTj] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [projectDescriptionRu, setProjectDescriptionRu] = useState("");
    const [isTajikLanguage, setIsTajikLanguage] = useState(false);
    // const [isLoading, setIsLoading] = useState(false);

    const { data, loading, error, setData } = useFetch("http://127.0.0.1:2024/get/project");
    const { t } = useTranslation();
    const lng = localStorage.getItem("i18nextLng");


    const [activeButtonProject, setActiveButtonProject] = useState(() => {
        return localStorage.getItem("activeButtonProject") || "addingProjects";
    });



    useEffect(() => {
        localStorage.setItem("activeButtonProject", activeButtonProject);
    }, [activeButtonProject]);



    // !
    const requestData = {
        "RussianProject": {
            "Banner": "fdsa",
            "Project_Name": projectName,
            "Realease_Date": "78",
            "Author": projectDescription
        },
        "TajikProject": {
            "Banner": "das",
            "Project_Name": projectNameTj,
            "Realease_Date": "78",
            "Author": projectDescriptionRu
        }
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

        fetch(`http://127.0.0.1:2024/delete/project?id=${itemId}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);

                const updatedData = data.filter(item => item.Id !== itemId);
                setData(updatedData);
            })
            .catch((error) => console.error(error));
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

    //     fetch("http://127.0.0.1:2024/add/project", requestOptions)
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
    const handleLanguage = (e) => {
        setIsTajikLanguage(e);
    };

    if (loading) return <p>{t("Loading...")}</p>;
    if (error) return <p>{t("Error")}: {error.message}</p>;

    return (
        <div>
            <div className="flex items-center justify-start py-[40px] ">
                <AdminStatisticsButton
                    className="border-r-0 rounded-r-[0px]"
                    active={activeButtonProject === 'addingProjects'}
                    onClick={() => setActiveButtonProject('addingProjects')}
                >
                    {t("Добавить проект")}
                </AdminStatisticsButton>
                <AdminStatisticsButton
                    className="border-l-0 rounded-l-[0px]"
                    active={activeButtonProject === 'projects'}
                    onClick={() => {
                        setActiveButtonProject('projects')
                        refreshPage()
                    }
                    }
                >
                    {t("Проекты")}
                </AdminStatisticsButton>
            </div>

            <div>
                {activeButtonProject === 'addingProjects' ? (
                    <div>
                        <form className="bg-[#D7E8E5] py-[15px] pr-[36px] pl-[20px] flex items-start justify-between gap-[52px] ">
                            <div >
                                {!isTajikLanguage ? (
                                    <div className="flex flex-col gap-5  ">
                                        <AdminInput
                                            type="text"
                                            placeholder="Заголовок"
                                            className="w-[1024px]"
                                            required={true}
                                            value={projectName}
                                            onChange={(e) => setProjectName(e.target.value)}
                                        />
                                        <AdminInput
                                            placeholder="Описание"
                                            className="w-[1024px]"
                                            value={projectDescription}
                                            required={true}
                                            onChange={(e) => setProjectDescription(e.target.value)}
                                        />
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-5 ">
                                        <AdminInput
                                            type="text"
                                            placeholder="Tajik title"
                                            className="w-[1024px]"
                                            required={true}
                                            value={projectNameTj}
                                            onChange={(e) => setProjectNameTj(e.target.value)}
                                        />
                                        <AdminInput
                                            placeholder="Tajik description"
                                            className="w-[1024px]"
                                            value={projectDescriptionRu}
                                            required={true}
                                            onChange={(e) => setProjectDescriptionRu(e.target.value)}
                                        />
                                    </div>
                                )}
                            </div>
                            <AdminLanguageSelector onLanguageChange={handleLanguage} />
                        </form>
                        <div className="flex justify-end pb-[40px] mr-[40px] relative top-[350px] ">
                            <AdminSubmitButton submitData={requestData} url="http://127.0.0.1:2024/add/project" />
                            {/* {isLoading && <p>Loading...</p>} */}
                        </div>
                    </div>
                ) : (
                    <div className="flex items-start  gap-5 flex-col mt-[50px]">
                        {data.map((item) => (
                            <div key={item.Id} className="flex items-center justify-between h-[83px] w-[1272px] rounded-[10px] py-[15px] px-[20px] border-[3px] border-[#249D8C] font-normal">
                                <div className=" font-normal text-[26px] text-[#000000]">
                                    <p className="text-[26px] font-semibold">
                                        {lng === "ru" ? item.RussianProject.project_name : item.TajikProject.project_name}
                                    </p>
                                    <p className="text-[22px]">
                                        {lng === "ru" ? item.RussianProject.author : item.TajikProject.author}
                                    </p>
                                </div>
                                <AdminButtonDelete onClick={() => handleDeleteStatistics(item.Id)} />
                            </div>
                        ))}
                        {/* {errorDelete && <p>{t("Error")}: {errorDelete}</p>} */}
                    </div>
                )}
            </div>
        </div >
    );
};

export default AdminProjects;
