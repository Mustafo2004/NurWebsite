import { useEffect, useState } from "react";
import AdminFieldBorder from "../AdminComponents/AdminFieldBorder/AdminFieldBorder"
import AdminStatisticsButton from "../AdminStatisticsButton/AdminStatisticsButton"
import AdminSubmitButton from "../AdminComponents/AdminSubmitButton/AdminSubmitButton";
import AdminButtonDelete from "../AdminComponents/AdminButtonDelete/AdminButtonDelete";
import { useTranslation } from "react-i18next";
import useFetch from "../../Hooks/Fetching"
import AdminInput from "../AdminComponents/AdminInput/AdminInput"
import AdminLanguageSelectoe from "../AdminLanguageSelectoe/AdminLanguageSelectoe"
import { Link } from "react-router-dom";


const AdminTeamPage = () => {
    const [activeButtonTeam, setActiveButtonTeam] = useState(() => {
        return localStorage.getItem("activeButtonTeam") || "addTeam";
    });
    useEffect(() => {

        localStorage.setItem("activeButtonTeam", activeButtonTeam);
    }, [activeButtonTeam]);

    useEffect(() => {
        const storedButton = localStorage.getItem("activeButtonTeam");
        if (storedButton) {
            setActiveButtonTeam(storedButton);
        }
    }, []);
    const { t } = useTranslation();
    console.log(t);

    const lng = localStorage.getItem("i18nextLng");
    const [isTajikLanguage, setIsTajikLanguage] = useState(false);

    const [NameTj, setNameTj] = useState("");
    const [proffesionTj, setProffesionTj] = useState("");
    const [educationTj, setEducationTj] = useState()
    const [specializationTj, setSpecialisationTj] = useState()
    const [expirenceTj, setExpirenceTj] = useState()

    const [NameRu, setNameRU] = useState("");
    const [proffesionRu, setProffesionRu] = useState("");
    const [specializationRu, setSpecialisationRu] = useState()
    const [educationRu, setEducationRu] = useState()
    const [expirenceRu, setExpirenceRu] = useState()
    // const [isLoading, setIsLoading] = useState(false);

    const [phone, setPhone] = useState()
    const [email, setEmail] = useState()
    const [photoPath, setPhotoPath] = useState("");
    const [base64File, setBase64File] = useState("");
    const [startingTime, setStartingTime] = useState()
    const [endingTime, setEndingTime] = useState()
    const [statingDay, setStatingDay] = useState()
    const [EndingDay, setEndingDay] = useState()

    useEffect(() => {

        localStorage.setItem("activeButtonTeam", activeButtonTeam);
    }, [activeButtonTeam]);
    // deleteData , ar delete
    const { data, loading, error, setData } = useFetch("http://127.0.0.1:2024/get/team/member");
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

        fetch(`http://127.0.0.1:2024/delete/team/member?id=${itemId}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);

                const updatedData = data.filter(item => item.Id !== itemId);
                setData(updatedData);
            })
            .catch((error) => console.error(error));


    };



    if (loading) return <p>Loading...</p>;
    const raw = {
        "Photo": base64File,
        "Phone": phone,
        "Email": email,
        "Date": {
            "Starting_hours": startingTime,
            "Ending_hours": endingTime,
            "Starting_Dweeks": statingDay,
            "ending_DWeeks": EndingDay
        },
        "RussianMembers": {
            "Name_Surname": NameRu,
            "Profession": proffesionRu,
            "Specialization": specializationRu,
            "Degree": educationRu,
            "Workexperience": expirenceRu,

        },
        "TajikMembers": {
            "Name_Surname": NameTj,
            "Profession": proffesionTj,
            "Specialization": specializationTj,
            "Degree": educationTj,
            "Workexperience": expirenceTj,

        }
    }
    console.log("raw", raw);
    if (error) return <p>Error: {error.message}</p>;

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     setIsLoading(true);
    //     console.log("hello");


    //     const requestOptions = {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(raw),
    //         credentials: "include",
    //     };


    //     console.log("requestOptions", requestOptions);

    //     fetch("http://127.0.0.1:2024/add/team/member", requestOptions)
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
    return (
        <div>
            <AdminFieldBorder>
                <div className="flex items-center justify-start my-[40px]">
                    <AdminStatisticsButton
                        className="border-r-0 rounded-r-none"
                        active={activeButtonTeam === "addTeam"}
                        onClick={() => setActiveButtonTeam("addTeam")}
                    >
                        Добавить специалиста
                    </AdminStatisticsButton>
                    <AdminStatisticsButton
                        className="border-l-0 rounded-l-none"
                        active={activeButtonTeam === "team"}
                        onClick={() => setActiveButtonTeam("team")}
                    >
                        Команда
                    </AdminStatisticsButton>
                </div>
                <form>
                    <div>

                        {activeButtonTeam === 'addTeam' ? (
                            <form>
                                <div>
                                    <div className="flex items-center justify-center gap-5 h-fit">

                                        <div className="bg-[#D7E8E5] pl-[20px] pr-[40px] rounded-l-[10px] py-[15px]   flex items-center justify-start mt-[39px] gap-[69px]">


                                            {!isTajikLanguage ? (
                                                <div className="">
                                                    <div className="flex items-center justify-center gap-5 flex-col">

                                                        <AdminInput
                                                            value={NameTj}
                                                            type="text"
                                                            placeholder="ИФ"
                                                            className="border-[3px] w-[1024px] bg-transparent h-[71px] rounded-[10px] border-[#249D8C]"
                                                            required={true}
                                                            onChange={(e) => setNameTj(e.target.value)}
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
                                                            value={educationTj}
                                                            className="border-[3px] w-[1024px] bg-transparent h-[71px] rounded-[10px] border-[#249D8C]"
                                                            required={true}
                                                            onChange={(e) => setEducationTj(e.target.value)}
                                                        />
                                                        <AdminInput
                                                            type="text"
                                                            value={specializationTj}
                                                            placeholder="СпециализацияTJ"
                                                            className="border-[3px] w-[1024px] bg-transparent h-[71px] rounded-[10px] border-[#249D8C]"
                                                            required={true}
                                                            onChange={(e) => setSpecialisationTj(e.target.value)}
                                                        />
                                                        <AdminInput
                                                            type="text"
                                                            value={expirenceTj}
                                                            placeholder="Опыт работы TJ"
                                                            className="border-[3px] w-[1024px] bg-transparent h-[71px] rounded-[10px] border-[#249D8C]"
                                                            required={true}
                                                            onChange={(e) => setExpirenceTj(e.target.value)}
                                                        />


                                                    </div>

                                                </div>
                                            ) : (
                                                <div className="">
                                                    <div className="flex items-center justify-center gap-5 flex-col">
                                                        <AdminInput
                                                            value={NameRu}
                                                            type="text"
                                                            placeholder="ИФ"
                                                            className="border-[3px] w-[1024px] bg-transparent h-[71px] rounded-[10px] border-[#249D8C]"
                                                            required={true}
                                                            onChange={(e) => setNameRU(e.target.value)}
                                                        />
                                                        <AdminInput
                                                            value={proffesionRu}
                                                            type="text"
                                                            placeholder="Профессия"
                                                            className="border-[3px] w-[1024px] bg-transparent h-[71px] rounded-[10px] border-[#249D8C]"
                                                            required={true}
                                                            onChange={(e) => setProffesionRu(e.target.value)}
                                                        />
                                                        <AdminInput
                                                            type="text"
                                                            placeholder="Образование"
                                                            value={educationRu}
                                                            className="border-[3px] w-[1024px] bg-transparent h-[71px] rounded-[10px] border-[#249D8C]"
                                                            required={true}
                                                            onChange={(e) => setEducationRu(e.target.value)}
                                                        />
                                                        <AdminInput
                                                            type="text"
                                                            value={specializationRu}
                                                            placeholder="Специализация"
                                                            className="border-[3px] w-[1024px] bg-transparent h-[71px] rounded-[10px] border-[#249D8C]"
                                                            required={true}
                                                            onChange={(e) => setSpecialisationRu(e.target.value)}
                                                        />

                                                        <AdminInput
                                                            type="text"
                                                            value={expirenceRu}
                                                            placeholder="Опыт работы"
                                                            className="border-[3px] w-[1024px] bg-transparent h-[71px] rounded-[10px] border-[#249D8C]"
                                                            required={true}
                                                            onChange={(e) => setExpirenceRu(e.target.value)}
                                                        />
                                                    </div>

                                                </div>
                                            )}
                                            <AdminLanguageSelectoe onLanguageChange={handleLanguage} />

                                        </div>
                                    </div>
                                    {/* ! */}
                                    <div className=" pl-[20px] flex flex-col gap-[13px]">
                                        <div className=" flex flex-col  gap-5">
                                            <div>{lng === "ru" ?
                                                <div className="flex gap-[11px] mt-[20px]  items-center justify-start">
                                                    {/*  */}
                                                    <select
                                                        value={statingDay}
                                                        onChange={(e) => setStatingDay(e.target.value)}
                                                        className="border-[3px] px-[20px] w-[484px] bg-transparent h-[71px] rounded-[10px] border-[#249D8C]"
                                                        required={true}
                                                    >
                                                        <option value="">Select a day</option>
                                                        <option value="Monday">Monday</option>
                                                        <option value="Tuesday">Tuesday</option>
                                                        <option value="Wednesday">Wednesday</option>
                                                        <option value="Thursday">Thursday</option>
                                                        <option value="Friday">Friday</option>
                                                        <option value="Saturday">Saturday</option>
                                                    </select>
                                                    <span className="w-[33px] border-[3px] border-[#249D8C]"></span>
                                                    <select
                                                        value={EndingDay}
                                                        onChange={(e) => setEndingDay(e.target.value)}
                                                        className="border-[3px] px-[20px] w-[484px] bg-transparent h-[71px] rounded-[10px] border-[#249D8C]"
                                                        required={true}
                                                    >
                                                        <option value="">Select a day</option>
                                                        <option value="Monday">Monday</option>
                                                        <option value="Tuesday">Tuesday</option>
                                                        <option value="Wednesday">Wednesday</option>
                                                        <option value="Thursday">Thursday</option>
                                                        <option value="Friday">Friday</option>
                                                        <option value="Saturday">Saturday</option>
                                                    </select>

                                                </div>
                                                :
                                                <div className="flex gap-[11px] mt-[20px]  items-center justify-start">
                                                    {/*  */}
                                                    <select
                                                        value={statingDay}
                                                        onChange={(e) => setStatingDay(e.target.value)}
                                                        className="border-[3px] px-[20px] w-[484px] bg-transparent h-[71px] rounded-[10px] border-[#249D8C]"
                                                        required={true}
                                                    >
                                                        <option value="">Select a day</option>
                                                        <option value="Monday">Понедельник</option>
                                                        <option value="Tuesday">Вторник</option>
                                                        <option value="Wednesday">Среда</option>
                                                        <option value="Thursday">Четверг</option>
                                                        <option value="Friday">Пятница</option>
                                                        <option value="Saturday">Суббота</option>
                                                    </select>
                                                    <span className="w-[33px] border-[3px] border-[#249D8C]"></span>
                                                    <select
                                                        value={EndingDay}
                                                        onChange={(e) => setEndingDay(e.target.value)}
                                                        className="border-[3px] px-[20px] w-[484px] bg-transparent h-[71px] rounded-[10px] border-[#249D8C]"
                                                        required={true}
                                                    >
                                                        <option value="">Select a day</option>
                                                        <option value="Monday">Понедельник</option>
                                                        <option value="Tuesday">Вторник</option>
                                                        <option value="Wednesday">Среда</option>
                                                        <option value="Thursday">Четверг</option>
                                                        <option value="Friday">Пятница</option>
                                                        <option value="Saturday">Суббота</option>
                                                    </select>

                                                </div>
                                            }</div>

                                            <div className="flex gap-[11px]  items-center justify-start">
                                                <AdminInput
                                                    type="time"
                                                    value={startingTime}
                                                    placeholder=""
                                                    className="border-[3px] w-[484px] bg-transparent h-[71px] rounded-[10px] border-[#249D8C]"
                                                    required={true}
                                                    onChange={(e) => setStartingTime(e.target.value)}
                                                />
                                                <span className="w-[33px] border-[3px] border-[#249D8C]"></span>
                                                <label htmlFor="">

                                                    <AdminInput
                                                        type="time"
                                                        value={endingTime}
                                                        placeholder=""
                                                        className="border-[3px] w-[484px] bg-transparent h-[71px] rounded-[10px] border-[#249D8C]"
                                                        required={true}
                                                        onChange={(e) => setEndingTime(e.target.value)}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                        <div className="  flex flex-col gap-[13px]">
                                            <AdminInput
                                                className=" w-[1024px] bg-transparent"
                                                type="tel"
                                                placeholder={"+992 | Телефон"}
                                                name="phone"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                required={true}
                                            />
                                            <AdminInput
                                                className=" w-[1024px] bg-transparent"
                                                type="email"
                                                placeholder="Почта"
                                                name="Почта"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required={true}
                                            />
                                            <div className="w-[1024px] flex items-center justify-between border-[#249D8C] border-[3px] py-[9px] px-[20px] h-[71px] rounded-[10px]">
                                                <AdminInput
                                                    className="focus:outline-none w-[300px] border-none bg-transparent"
                                                    type="text"
                                                    placeholder="Фотография"
                                                    value={photoPath}
                                                    readOnly
                                                />
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleFileChange(e, setPhotoPath, setBase64File)}
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
                                    </div>
                                </div>
                            </form>
                        ) : (
                            <div className="flex items-stat gap-5 flex-col mt-[50px]">
                                {data.map((item) => (
                                    <div key={item.id} className="flex cursor-pointer items-center justify-between h-[83px] w-[1272px] rounded-[10px] py-[15px] px-[20px] border-[3px] border-[#249D8C]">

                                        <Link to={`/team/${item.Id}`}>
                                            <div className="flex cursor-pointer items-center justify-between">
                                                <div className="flex items-center justify-center gap-[15px] font-normal text-[26px] text-[#999999]">
                                                    <p>{lng === "ru" ? item.russianmembers.name_surname : item.tajikmembers.name_surname}</p>
                                                    <span className="w-[29px] border-[2px] rotate-90 border-[#249D8C]"></span>
                                                    <p>{lng === "ru" ? item.russianmembers.profession : item.tajikmembers.profession}</p>
                                                </div>

                                            </div>
                                        </Link>
                                        <AdminButtonDelete
                                            onClick={() => handleDeleteStatistics(item.Id)}
                                        />
                                    </div>

                                ))}
                            </div>
                        )}

                        <div className="items-end flex justify-end mr-[40px]">
                            <AdminSubmitButton type="button" submitData={raw} url="http://127.0.0.1:2024/add/team/member"  />
                            {/* {isLoading && <p>Loading...</p>} */}
                        </div>
                    </div>

                </form >
            </AdminFieldBorder >
        </div >
    )
}

export default AdminTeamPage
