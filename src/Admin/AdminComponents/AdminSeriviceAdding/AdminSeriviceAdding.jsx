import { useState } from "react";
import AdminInput from "../AdminInput/AdminInput";
import AdminSubmitButton from "../AdminSubmitButton/AdminSubmitButton";
import AdminLanguageSelector from "../../AdminLanguageSelectoe/AdminLanguageSelectoe";
import useFetch from "../../../Hooks/Fetching";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();

const AdminServiceAdding = () => {
    const { data, loading, error } = useFetch("http://127.0.0.1:2024/get/team/member");
    // const lng = localStorage.getItem("i18nextLng");

    const handleLanguage = (e) => {
        setIsTajikLanguage(e);
    };

    const [titleTj, setTitleTj] = useState("");
    const [titleRu, setTitleRu] = useState("");
    const [descriptionTj, setDescriptionTj] = useState("");
    const [descriptionRu, setDescriptionRu] = useState("");

    const [durationTj, setDurationTj] = useState()
    const [isTajikLanguage, setIsTajikLanguage] = useState(false);
    // const [selectedMembers, setSelectedMembers] = useState([]);






    const handleSubmit = async () => {
        const requestData = {
            russianstatistics: {
                value: titleRu,
                description: descriptionRu,
                Duration: durationTj,
            },
            tajikstatistics: {
                value: titleTj,
                description: descriptionTj,
                Duration: durationTj,
            },
            // selectedMembers
        };

        const response = await fetch("http://127.0.0.1:2024/add/statistics", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData),
            credentials: "include",
        });

        if (response.ok) {
            console.log("Submission successful");
        } else {
            console.error("Submission failed");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <div className="flex items-center justify-center gap-5 h-fit">
                <div className="bg-[#D7E8E5] pl-[20px] pr-[40px] rounded-l-[10px] py-[15px] flex items-center justify-start mt-[39px] gap-[69px]">
                    {!isTajikLanguage ? (
                        <div className="flex flex-col gap-5">
                            <AdminInput
                                type="text"
                                placeholder="Заголовок"
                                className="w-[1024px]"
                                required={true}
                                value={titleTj}
                                onChange={(e) => setTitleTj(e.target.value)}
                            />
                            <AdminInput
                                type="text"
                                placeholder="Описание"
                                className="w-[1024px]"
                                required={true}
                                value={descriptionTj}
                                onChange={(e) => setDescriptionTj(e.target.value)}
                            />
                            <AdminInput
                                type="text"
                                placeholder="Описание"
                                className="w-[1024px]"
                                required={true}
                                value={durationTj}
                                onChange={(e) => setDurationTj(e.target.value)}
                            />


                            <div>
                                <Select
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    defaultValue={[data[4], data]}
                                    isMulti
                                    options={data}
                                />
                            </div>


                        </div>
                    ) : (
                        <div className="flex items-center flex-col justify-center gap-5 h-fit">
                            <AdminInput
                                type="text"
                                placeholder="Заголовок"
                                className="w-[1024px]"
                                required={true}
                                value={titleRu}
                                onChange={(e) => setTitleRu(e.target.value)}
                            />
                            <AdminInput
                                type="text"
                                placeholder="Описание"
                                className="w-[1024px]"
                                required={true}
                                value={descriptionRu}
                                onChange={(e) => setDescriptionRu(e.target.value)}
                            />
                        </div>
                    )}
                    <AdminLanguageSelector onLanguageChange={handleLanguage} />
                </div>
            </div>
            <div className="items-end flex justify-end mr-[40px] my-[400px]">
                <AdminSubmitButton submitData={handleSubmit} url="http://127.0.0.1:2024/add/statistics" />
            </div>
        </div>
    );
};

export default AdminServiceAdding;
