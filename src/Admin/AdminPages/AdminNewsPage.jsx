import { useTranslation } from "react-i18next";
import AdminStatisticsButton from "../AdminStatisticsButton/AdminStatisticsButton";
import { useEffect, useRef, useState } from "react";
import useFetch from "../../Hooks/Fetching";
import AdminLanguageSelector from "../AdminLanguageSelectoe/AdminLanguageSelectoe";
import AdminSubmitButton from "../AdminComponents/AdminSubmitButton/AdminSubmitButton";
import AdminButtonDelete from "../AdminComponents/AdminButtonDelete/AdminButtonDelete";
import AdminInput from "../AdminComponents/AdminInput/AdminInput";
import AdminFieldBorder from "../AdminComponents/AdminFieldBorder/AdminFieldBorder";
import { Link } from "react-router-dom";
import calendar from "../../assets/Icons/calendar.svg"

const AdminNewsPage = () => {
    const dateTimeRef = useRef()
    const [projectName, setProjectName] = useState("");
    const [projectNameTj, setProjectNameTj] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [projectDescriptionTj, setProjectDescriptionTj] = useState("");
    const [photoPath, setPhotoPath] = useState("");
    const [photoPathOne, setPhotoPathOne] = useState("");
    const [photoPathTwo, setPhotoPathTwo] = useState("");

    const [dataTime, setDataTime] = useState("");
    const [base64File, setBase64File] = useState("");
    const [base64FileOne, setBase64FileOne] = useState("");
    const [base64FileTwo, setBase64FileTwo] = useState("");
    const [isTajikLanguage, setIsTajikLanguage] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const { data, loading, error, setData } = useFetch("http://127.0.0.1:2024/get/news");
    const { t } = useTranslation();
    const lng = localStorage.getItem("i18nextLng");

    const [activeButtonNews, setActiveButtonNews] = useState(() => {
        return localStorage.getItem("activeButtonNews") || "addNews";
    });

    useEffect(() => {
        localStorage.setItem("activeButtonNews", activeButtonNews);
    }, [activeButtonNews]);

    const raw = {
        "Date": dataTime,
        "BannerM": base64File,
        "Banner2": base64FileOne,
        "Banner3": base64FileTwo,
        "RussianNews": {
            "Title": projectName,
            "Short_Info": projectDescription
        },
        "TajikNews": {
            "Title": projectNameTj,
            "Short_Info": projectDescriptionTj
        }
    };
    function refreshPage() {
        window.location.reload(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...raw, }),
            credentials: "include",
        };

        fetch("http://127.0.0.1:2024/add/news", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log("Success:", result);
            })
            .catch((error) => {
                console.error("Error:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleLanguage = (e) => {
        setIsTajikLanguage(e);
    };

    const handleFileChange = (event, setFileState, setBase64State) => {
        const file = event.target.files[0];
        if (file) {
            setFileState(file.name);

            const reader = new FileReader();
            reader.onloadend = function () {
                const base64String = btoa(reader.result);
                setBase64State(base64String);
            };

            reader.readAsBinaryString(file);
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

        fetch(`http://127.0.0.1:2024/delete/news?id=${itemId}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);

                const updatedData = data.filter(item => item.Id !== itemId);
                setData(updatedData);
            })
            .catch((error) => console.error(error));
    };

    if (loading) return <p>{t("Loading...")}</p>;
    if (error) return <p>{t("Error")}: {error.message}</p>;

    return (
        <AdminFieldBorder>
            <div>
                <div>
                    <div className="flex items-center justify-start py-[40px] ">
                        <AdminStatisticsButton
                            className="border-r-0 rounded-r-[0px]"
                            active={activeButtonNews === 'addNews'}
                            onClick={() => setActiveButtonNews('addNews')}
                        >
                            {t("Добавить новость")}
                        </AdminStatisticsButton>
                        <AdminStatisticsButton
                            className="border-l-0 rounded-l-[0px]"
                            active={activeButtonNews === 'news'}
                            onClick={() => {
                                setActiveButtonNews('news')
                                refreshPage()
                            }}
                        >
                            {t("Новости")}
                        </AdminStatisticsButton>
                    </div>
                    <div>
                        {activeButtonNews === 'addNews' ? (
                            <div>
                                <form onSubmit={handleSubmit} className=" ">
                                    <div>
                                        <div className="bg-[#D7E8E5] w-full rounded-l-[10px] py-[15px] pr-[36px] pl-[20px] flex items-start justify-between gap-[52px]">
                                            <div>
                                                {!isTajikLanguage ? (
                                                    <div className="flex flex-col gap-5">
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
                                                    <div className="flex flex-col gap-5">
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
                                                            value={projectDescriptionTj}
                                                            required={true}
                                                            onChange={(e) => setProjectDescriptionTj(e.target.value)}
                                                        />
                                                        {/* <textarea name="adf" id="" placeholder="Описание">
                                                            df
                                                        </textarea> */}
                                                    </div>
                                                )}
                                            </div>
                                            <AdminLanguageSelector onLanguageChange={handleLanguage} />
                                        </div>
                                        <div className="px-[20px] mt-[20px] flex gap-5 flex-col items-start">
                                            {/* <AdminInput
                                                type="date"
                                                placeholder="Дата"
                                                className="w-[1024px]"
                                                required={true}
                                                value={dataTime}
                                                onChange={(e) => setDataTime(e.target.value)}
                                            /> */}
                                            <div className='flex  justify-startflex justify-between items-center  px-[20px]  w-[1024px] border-[#249D8C] border-[3px] rounded-[10px]  h-[71px]'>
                                                <input type="text"
                                                    placeholder='Даты'

                                                    value={dataTime}
                                                    className="bg-transparent w-full focus:outline-none"
                                                />

                                                <input
                                                    type="date"
                                                    placeholder='Date'
                                                    id="date-time"
                                                    onChange={(e) => setDataTime(e.target.value)}
                                                    value={dataTime}
                                                    ref={dateTimeRef}
                                                    style={{ opacity: "0" }}
                                                />
                                                <button
                                                    style={{ border: "none", background: "white" }}
                                                >
                                                    <img
                                                        // className='w-[60px] h-[30px]'
                                                        style={{ objectFit: "cover" }}
                                                        onClick={() => { dateTimeRef.current.showPicker() }}
                                                        src={calendar}
                                                        alt="" />
                                                </button>

                                            </div>
                                            <div className="w-[1024px] flex  items-center justify-between border-[#249D8C] border-[3px] py-[9px] px-[20px] h-[71px] rounded-[10px]">
                                                <AdminInput
                                                
                                                    className="focus:outline-none w-[500px] border-none bg-transparent"
                                                    type="text"
                                                    placeholder="Фотография - основная"
                                                    value={photoPath}
                                                    readOnly
                                                />
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleFileChange(e, setPhotoPath, setBase64File)}
                                                    style={{ display: "none" }}
                                                    id="photo-upload"
                                                />
                                                <label
                                                    className="w-[250px] h-[53px] flex items-center justify-center text-[#249D8C] font-medium text-[26px] bg-white border-[#249D8C] border-[2px] cursor-pointer rounded-md"
                                                    htmlFor="photo-upload"
                                                >
                                                    Выбрать фото
                                                </label>
                                            </div>

                                            <div className="w-[1024px] flex items-center justify-between border-[#249D8C] border-[3px] py-[9px] px-[20px] h-[71px] rounded-[10px]">
                                                <AdminInput
                                                    className="focus:outline-none w-[300px] border-none bg-transparent"
                                                    type="text"
                                                    placeholder="Фотография 2"
                                                    value={photoPathOne}
                                                    readOnly
                                                />
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleFileChange(e, setPhotoPathOne, setBase64FileOne)}
                                                    style={{ display: "none" }}
                                                    id="photo-upload-one"
                                                />
                                                <label
                                                    className="w-[250px] h-[53px] flex items-center justify-center text-[#249D8C] font-medium text-[26px] bg-white border-[#249D8C] border-[2px] cursor-pointer rounded-md"
                                                    htmlFor="photo-upload-one"
                                                >
                                                    Выбрать фото
                                                </label>
                                            </div>

                                            <div className="w-[1024px] flex items-center justify-between border-[#249D8C] border-[3px] py-[9px] px-[20px] h-[71px] rounded-[10px]">
                                                <AdminInput
                                                    className="focus:outline-none w-[300px] border-none bg-transparent"
                                                    type="text"
                                                    placeholder="Фотография 3"
                                                    value={photoPathTwo}
                                                    readOnly
                                                />
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleFileChange(e, setPhotoPathTwo, setBase64FileTwo)}
                                                    style={{ display: "none" }}
                                                    id="photo-upload-two"
                                                />
                                                <label
                                                    className="w-[250px] h-[53px] flex items-center justify-center text-[#249D8C] font-medium text-[26px] bg-white border-[#249D8C] border-[2px] cursor-pointer rounded-md"
                                                    htmlFor="photo-upload-two"
                                                >
                                                    Выбрать фото
                                                </label>
                                            </div>
                                        </div>
                                        <div className="py-[40px] flex items-end flex-col justify-end mx-[20px]">
                                            <AdminSubmitButton submitData={raw} url="http://127.0.0.1:2024/add/news" />
                                            {/* <button onClick={() => handleSubmit()}>Submit</button> */}
                                            {isLoading && <p>Loading...</p>}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div>
                                <ul className="flex flex-col items-start gap-5">
                                    {data.map(item => (
                                        <div key={item.Id} className="flex flex-col gap-5">
                                            <div className="flex items-center justify-between h-[83px] w-[1272px] rounded-[10px] py-[15px] px-[20px] border-[3px] 
                                            border-[#249D8C]">
                                                <div className="flex items-center w-full">
                                                    <Link to={`/news/${item.Id}`} className="w-full">
                                                        <div className="flex items-center justify-start gap-[15px] font-normal text-[26px] text-[#999999]">
                                                            <p>{item.date}</p>
                                                            <span className="w-[29px] border-[2px] rotate-90 border-[#249D8C]"></span>
                                                            <p>{lng === "ru" ? item.TajikNews.title : item.RussianNews.title}</p>
                                                        </div>
                                                    </Link>
                                                </div>
                                                <AdminButtonDelete
                                                    className="min-w-[20px] min-h-[20px]"
                                                    onClick={() => handleDeleteStatistics(item.Id)}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminFieldBorder>
    );
};

export default AdminNewsPage;
