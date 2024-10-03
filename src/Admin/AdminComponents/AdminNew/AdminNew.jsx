import { Link, useNavigate, useParams } from "react-router-dom";
import trashwhite from "../../../assets/Icons/trashwhite.png";
import useFetch from "../../../Hooks/Fetching";
// import AdminFieldBorder from "../AdminFieldBorder/AdminFieldBorder";
import { useState } from "react";

const AdminNew = () => {
    const { newId } = useParams();
    console.log(newId);

    const { data, loading, error, setData } = useFetch(`http://127.0.0.1:2024/get/one/news?id=${newId}`);
    console.log(data);
    const navigate = useNavigate();

    const lng = localStorage.getItem("i18nextLng");
    const images = [
        `http://127.0.0.1:2024/read/file?Path=${data.bannerm}`,
        `http://127.0.0.1:2024/read/file?Path=${data.banner2}`,
        `http://127.0.0.1:2024/read/file?Path=${data.banner3}`,
    ];

    console.log("dfas", images);

    const [currentImage, setCurrentImage] = useState(images[0]);
    const [activeIndex, setActiveIndex] = useState(0);  // Track the active button

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    console.log(currentImage);

    const handleButtonClick = (index) => {
        setCurrentImage(images[index]);
        setActiveIndex(index);  // Set the clicked button as active
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

        fetch(`http://127.0.0.1:2024/delete/news?id=${newId}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                navigate("/news");

                const updatedData = data.filter(item => item.Id !== itemId);
                setData(updatedData);
            })
            .catch((error) => console.error(error));


    };

    return (
        <div>
            <div className="border-[3px]  border-[#249D8C] ">
                <div className="flex items-center justify-between my-[40px] px-[40px]">
                    <Link to="/news">
                        <button className="w-[202px] text-[#249D8C] font-semibold text-[26px] h-[66px] rounded-[5px] border-[3px] border-[#249D8C] ">
                            Назад
                        </button>
                    </Link>
                    <button onClick={() => handleDeleteStatistics(data.Id)} className="bg-[#FF6262] gap-[15px] rounded-[5px] text-[#FFFFFF] font-normal text-[30px] border-[3px] border-[#FF6262] flex items-center justify-center h-[63px] w-[308px]">
                        <img src={trashwhite} alt="" />
                        Delete
                    </button>
                </div>
                <div className="">
                    <div className="flex items-start justify-start w-full">
                        <div className="flex flex-col items-center gap-[20px] border-[3px] w-full border-[#249D8C] border-b-0  h-full">
                            <img src={currentImage} className="h-[614px] " />
                            <div className="flex items-center">
                                <div className="flex items-center w-full justify-center gap-[30px] mb-[17px]">
                                    {images.map((_, index) => (
                                        <button
                                            key={index}
                                            className={`w-[134px] h-[66px] rounded-[5px] rounded-b-none flex items-center justify-center border-[#249D8C] border-[3px] ${activeIndex === index ? "bg-green-500" : ""}`}
                                            onClick={() => handleButtonClick(index)}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                </div>
                            </div>

                        </div>
                        <div className=" border-[#249D8C] border-t-[3px]  h-full p-[40px]">
                            <div className="flex justify-end h-full items-end flex-col">

                                <div>
                                    <h1 className="text-[#303C3A] text-[40px] font-semibold w-[718px]">{lng === "ru" ? data.TajikNews.title : data.RussianNews.title}</h1>
                                    <p>{lng === "ru" ? data.TajikNews.short_info : data.RussianNews.short_info}</p>
                                </div>
                                <p className="text-[#595959] font-semibold text-[25px]">{data.date}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminNew;
