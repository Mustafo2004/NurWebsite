import { useState, useEffect } from "react";
import AdminStatisticsButton from "../AdminStatisticsButton/AdminStatisticsButton";
import AdminFieldBorder from "../AdminComponents/AdminFieldBorder/AdminFieldBorder";
import AdminSubmitButton from "../AdminComponents/AdminSubmitButton/AdminSubmitButton";
import AdminInput from "../AdminComponents/AdminInput/AdminInput";
import useFetch from "../../Hooks/Fetching";
import AdminButtonDelete from "../AdminComponents/AdminButtonDelete/AdminButtonDelete";

const AdminPartners = () => {
    const [activeButtonPartner, setActiveButtonPartner] = useState(() => {
        return localStorage.getItem("activeButtonPartner") || "addparnters";
    });
    const [photoPath, setPhotoPath] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [base64File, setBase64File] = useState("");
    const { data, loading, error, setData } = useFetch("http://127.0.0.1:2024/get/partners");
    console.log(data, "Daa");


    useEffect(() => {

        localStorage.setItem("activeButtonPartner", activeButtonPartner || "addparnters");
    }, [activeButtonPartner]);

    useEffect(() => {
        const storedButton = localStorage.getItem("activeButtonPartner");
        if (storedButton) {
            setActiveButtonPartner(storedButton);
        }
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;


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
    // !


    function refreshPage() {
        window.location.reload(false);
    }
    const newPartner = {
        Logo: base64File
    };
    const handleSubmit = (event) => {
        event.preventDefault();

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPartner),
            credentials: 'include',
        };


        fetch("http://127.0.0.1:2024/add/partners", requestOptions)
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


    const handleDeleteStatistics = (itemId) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow",
            credentials: 'include',
        };

        fetch(`http://127.0.0.1:2024/delete/partners?id=${itemId}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);

                const updatedData = data.filter(item => item.Id !== itemId);
                setData(updatedData);
            })
            .catch((error) => console.error(error));
    };
    return (
        <div>
            <AdminFieldBorder className="p-[40px] ">
                <div>
                    <div className="flex items-center justify-start">
                        <AdminStatisticsButton
                            className="border-r-0 rounded-r-none"
                            active={activeButtonPartner === "addparnters"}
                            onClick={() => setActiveButtonPartner("addparnters")}
                        >
                            Добавить партнера
                        </AdminStatisticsButton>
                        <AdminStatisticsButton
                            className="border-l-0 rounded-l-none"
                            active={activeButtonPartner === "partners"}
                            onClick={() => {
                                setActiveButtonPartner("partners");
                                refreshPage();
                            }}
                        >
                            Партнеры
                        </AdminStatisticsButton>
                    </div>
                    {activeButtonPartner === "addparnters" ? (
                        <div className="my-[56px] mb-[400px]">
                            <form onSubmit={handleSubmit}>

                                <div className="flex items-center justify-between border-[3px]  h-[71px] p-2 rounded-md w-full border-[#249D8C] px-[20px] py-[20px]">
                                    <AdminInput
                                        className="focus:outline-none border-none h-[20px] bg-transparent "
                                        style={{ border: 'none', backgroundColor: 'transparent' }}
                                        type="text"
                                        placeholder="Логотип"
                                        value={photoPath}
                                    />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        style={{ display: "none" }}
                                        id="photo-upload"
                                        className="bg-transparent"
                                    />
                                    <label
                                        className="w-[250px] h-[53px] flex items-center justify-center text-[#249D8C] font-medium text-[26px] bg-white border-[#249D8C] border-[2px] cursor-pointer rounded-md"
                                        htmlFor="photo-upload"
                                    >
                                        Выбрать фото
                                    </label>
                                </div>
                            </form>
                            <div className="flex items-end justify-end h-full relative top-[400px]">
                                <AdminSubmitButton
                                    url="http://127.0.0.1:2024/add/partners"
                                    submitData={newPartner}
                                />
                                {isLoading && <p>Loading...</p>}
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-4 gap-5 mt-[50px] ">
                            {data.map((item) => (
                                <div key={item.Id}>
                                    <div className="rounded-[10px]  overflow-hidden w-[316px] gap-5 bg-[#D7E8E5]  flex justify-between flex-col p-5 items-center">
                                        <div className="flex justify-center items-center ">
                                            <img src={`http://127.0.0.1:2024/read/file?Path=${item.Logo}`} alt="Partner logo" className="w-full h-[300px] object-contain" />
                                        </div>
                                        <AdminButtonDelete onClick={() => handleDeleteStatistics(item.Id)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}


                </div>
            </AdminFieldBorder >
        </div >
    );
};

export default AdminPartners;
