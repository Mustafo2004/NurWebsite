import { useState } from "react";
import AdminInput from "../AdminInput/AdminInput";
import AdminSubmitButton from "../AdminSubmitButton/AdminSubmitButton";
import AdminLanguageSelector from "../../AdminLanguageSelectoe/AdminLanguageSelectoe";
import useFetch from "../../../Hooks/Fetching";
import X from "../../../assets/Icons/X.svg"
import Plus from "../../../assets/Icons/Plus.svg"
import Select from 'react-select';
// import makeAnimated from 'react-select/animated';
// const animatedComponents = makeAnimated();

const AdminServiceAdding = () => {
    const { data, loading, error } = useFetch("http://127.0.0.1:2024/get/team/member");
    console.log("data1", data);

    // const lng = localStorage.getItem("i18nextLng");
    const [isTajikLanguage, setIsTajikLanguage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const handleLanguage = (e) => {
        setIsTajikLanguage(e);
    };
    const [additionalRu, setAdditionalRu] = useState("")
    const [InfoRu, setInfoRu] = useState([]);

    const addRu = () => {
        if (additionalRu.trim() !== '') {
            setInfoRu([...InfoRu, additionalRu]); // Добавляем новое значение в массив
            setAdditionalRu(''); // Очищаем поле ввода после добавления
        }
    };

    const removeInfoRu = (indexToRemove) => {
        setInfoRu(InfoRu.filter((_, index) => index !== indexToRemove));
    };
    // ! TJ
    const [titleTj, setTitleTj] = useState("");
    const [descriptionTj, setDescriptionTj] = useState("");
    // ! Ru
    const [titleRu, setTitleRu] = useState("");
    const [descriptionRu, setDescriptionRu] = useState("");
    // ! other
    const [duration, setDuration] = useState()
    const [date, setDate] = useState()
    const [phone, setPhone] = useState()
    const [email, setEmail] = useState()
    // ! Photo
    const [photoPath, setPhotoPath] = useState("");
    const [base64File, setBase64File] = useState("");
    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            setPhotoPath(file.name);

            const reader = new FileReader();

            reader.onloadend = function () {
                const rawData = reader.result;

                const chunkSize = 100536;
                let offset = 0;
                let base64String = "";

                while (offset < rawData.byteLength) {
                    const chunk = rawData.slice(offset, offset + chunkSize);
                    base64String += btoa(String.fromCharCode.apply(null, new Uint8Array(chunk)));
                    offset += chunkSize;
                }

                setBase64File(base64String);
            };

            reader.readAsArrayBuffer(file);
        }
    };


    // const [selectedMembers, setSelectedMembers] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    // const options = [
    //     { value: 'chocolate', label: 'Chocolate' },
    //     { value: 'strawberry', label: 'Strawberry' },
    //     { value: 'vanilla', label: 'Vanilla' },
    // ];
    const optionsTj = data.map(item => ({
        value: item.Id,
        label: item.tajikmembers?.name_surname
    }));
    const optionsRu = data.map(item => ({
        value: item.Id,
        label: item.russianmembers?.name_surname
    }));



    const raw = {
        "Photo": base64File,
        "Dates": date,
        "Phone": phone,
        "Email": email,
        "Duration": duration,
        "RussianServices": {
            "Title": titleRu,
            "Description": descriptionRu,
            "Specialists": [
                optionsRu
            ],
            "ServiceContents": [
                "7878787878"
            ]
        },
        "TajikServices": {
            "Title": titleTj,
            "Description": descriptionTj,
            "Specialists": [
                optionsTj
            ],
            "ServiceContents": [
                "7878787"
            ]
        }
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...raw }),
            credentials: "include",
        };

        fetch("http://127.0.0.1:2024/add/services", requestOptions)
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



    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;


    return (
        <div className="w-fit">
            <div className="flex items-center justify-center gap-5 h-fit">
                <div className="  flex items-center justify-start mt-[39px] gap-[69px]">
                    {!isTajikLanguage ? (
                        <form >
                            <div>

                                <div className="flex pl-[20px] pr-[40px] rounded-l-[10px] py-[15px]  gap-5 bg-[#D7E8E5]">
                                    <div className="flex gap-5 flex-col">
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


                                        <Select
                                            defaultValue={selectedOption}
                                            onChange={setSelectedOption}
                                            options={optionsRu}
                                            isMulti
                                            styles={{
                                                control: (baseStyles) => ({
                                                    ...baseStyles,
                                                    height: '69px',
                                                    borderRadius: '10px',
                                                    borderWidth: '3px',
                                                    borderColor: '#249D8C',
                                                    paddingTop: '15px',
                                                    paddingBottom: '15px',
                                                    paddingLeft: '20px',
                                                    paddingRight: '20px',
                                                }),
                                                option: (baseStyles) => ({
                                                    ...baseStyles,
                                                }),
                                            }}
                                        />

                                        <div className="">

                                            <div className="flex px-[20px] h-[69px] rounded-[10px] border-[3px] border-[#249D8C]   items-center justify-between">
                                                <div className="w-full">
                                                    <h3 className="text-[#999999] text-[12px] font-normal">Что включает услуга</h3>
                                                    <input
                                                        className="w-full bg-transparent  border-none h-full focus:outline-none"
                                                        type="text"
                                                        onChange={(e) => setAdditionalRu(e.target.value)}
                                                        value={additionalRu}
                                                    />
                                                </div>
                                                <div className="h-[53px] bg-white w-[106px] rounded-[5px] flex items-center justify-center">
                                                    <img onClick={addRu} src={Plus} alt="" />
                                                </div>
                                            </div>
                                            <ul className=" flex  justify-start items-center flex-wrap mt-[15px] gap-[20px]">
                                                {InfoRu.map((serviceRu, index) => (
                                                    <div key={serviceRu.Id} className="bg-[#E9FAF7] w-fit rounded-[5px] p-[5px] flex items-center justify-start gap-[5px]">
                                                        <li key={index}>
                                                            {serviceRu}
                                                        </li>
                                                        <img src={X} onClick={() => removeInfoRu(index)} alt="" />
                                                    </div>
                                                ))}
                                            </ul>
                                        </div>

                                        <AdminInput
                                            type="text"
                                            placeholder="Длительность"
                                            className="w-[1024px]"
                                            required={true}
                                            value={duration}
                                            onChange={(e) => setDuration(e.target.value)}
                                        />
                                    </div>
                                    <AdminLanguageSelector onLanguageChange={handleLanguage} />
                                </div>
                                <div>
                                    <div className="flex mt-5 flex-col gap-5 pl-[20px]">

                                        <AdminInput
                                            type="date"
                                            placeholder="Даты"
                                            className="w-[1024px]"
                                            required={true}
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                        />
                                        <AdminInput
                                            className="w-[1024px]"
                                            type="tel"
                                            placeholder={"+992 | Телефон"}
                                            name="phone"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            required={true}
                                        />
                                        <AdminInput
                                            className="w-[1024px]"
                                            type="email"
                                            placeholder="Почта"
                                            name="phone"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required={true}
                                        />

                                        <div className="w-[1024px] flex items-center bg-white justify-between border-[#249D8C] border-[3px] py-[9px] px-[20px] h-[71px] rounded-[10px]">
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
                                                id="photo-upload"
                                            />
                                            <label
                                                className="w-[250px] h-[53px] flex items-center justify-center text-[#249D8C] font-medium text-[26px] bg-white border-[#249D8C] border-[2px] cursor-pointer rounded-md"
                                                htmlFor="photo-upload"
                                            >
                                                Выбрать фото
                                            </label>
                                        </div>

                                    </div>
                                </div>


                            </div>
                        </form>
                    ) : (
                        <form >
                            <div>

                                <div className="flex pl-[20px] pr-[40px] rounded-l-[10px] py-[15px]  gap-5 bg-[#D7E8E5]">
                                    <div className="flex gap-5 flex-col">
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


                                        <Select
                                            defaultValue={selectedOption}
                                            onChange={setSelectedOption}
                                            options={optionsTj}
                                            isMulti
                                            styles={{
                                                control: (baseStyles) => ({
                                                    ...baseStyles,
                                                    height: '69px',
                                                    borderRadius: '10px',
                                                    borderWidth: '3px',
                                                    borderColor: '#249D8C',
                                                    paddingTop: '15px',
                                                    paddingBottom: '15px',
                                                    paddingLeft: '20px',
                                                    paddingRight: '20px',
                                                }),
                                                option: (baseStyles) => ({
                                                    ...baseStyles,
                                                }),
                                            }}
                                        />
                                        <div className="">
                                            <div className="flex px-[20px] h-[69px] rounded-[10px] border-[3px] border-[#249D8C]   items-center justify-between">
                                                <div className="w-full">
                                                    <h3 className="text-[#999999] text-[12px] font-normal">Что включает услуга</h3>
                                                    <input
                                                        className="w-full bg-transparent  border-none h-full focus:outline-none"
                                                        type="text"
                                                        onChange={(e) => setAdditionalRu(e.target.value)}
                                                        value={additionalRu}
                                                    />
                                                </div>
                                                <div className="h-[53px] bg-white w-[106px] rounded-[5px] flex items-center justify-center">
                                                    <img onClick={addRu} src={Plus} alt="" />
                                                </div>
                                            </div>
                                            <ul className=" flex  justify-start items-center mt-[15px] gap-[20px]">
                                                {InfoRu.map((serviceRu, index) => (
                                                    <div key={serviceRu.Id} className="bg-[#E9FAF7] w-fit rounded-[5px] p-[5px] flex items-center justify-start gap-[5px]">
                                                        <li key={index}>
                                                            {serviceRu}
                                                        </li>
                                                        <img src={X} onClick={() => removeInfoRu(index)} alt="" />
                                                    </div>
                                                ))}
                                            </ul>
                                        </div>

                                        <AdminInput
                                            type="text"
                                            placeholder="Длительность"
                                            className="w-[1024px]"
                                            required={true}
                                            value={duration}
                                            onChange={(e) => setDuration(e.target.value)}
                                        />
                                    </div>
                                    <AdminLanguageSelector onLanguageChange={handleLanguage} />
                                </div>
                                <div>
                                    <div className="flex mt-5 flex-col gap-5 pl-[20px]">

                                        <AdminInput
                                            type="date"
                                            placeholder="Даты"
                                            className="w-[1024px]"
                                            required={true}
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                        />
                                        <AdminInput
                                            className="w-[1024px]"
                                            type="tel"
                                            placeholder={"+992 | Телефон"}
                                            name="phone"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            required={true}
                                        />
                                        <AdminInput
                                            className="w-[1024px]"
                                            type="email"
                                            placeholder="Почта"
                                            name="phone"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required={true}
                                        />

                                        <div className="w-[1024px] flex items-center bg-white justify-between border-[#249D8C] border-[3px] py-[9px] px-[20px] h-[71px] rounded-[10px]">
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
                                                id="photo-upload"
                                            />
                                            <label
                                                className="w-[250px] h-[53px] flex items-center justify-center text-[#249D8C] font-medium text-[26px] bg-white border-[#249D8C] border-[2px] cursor-pointer rounded-md"
                                                htmlFor="photo-upload"
                                            >
                                                Выбрать фото
                                            </label>
                                        </div>

                                    </div>
                                </div>


                            </div>
                        </form>
                    )}

                </div>
            </div>
            <div className="items-end flex justify-end mr-[40px] ">
                <AdminSubmitButton submitData={handleSubmit} url="http://127.0.0.1:2024/add/services" />
                {isLoading && <p>Loading...</p>}
            </div>
        </div >
    );
};

export default AdminServiceAdding;
