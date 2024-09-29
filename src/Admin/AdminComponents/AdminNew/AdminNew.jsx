import { Link, useParams } from "react-router-dom";
import trashwhite from "../../../assets/Icons/trashwhite.png";
import useFetch from "../../../Hooks/Fetching";
import AdminFieldBorder from "../AdminFieldBorder/AdminFieldBorder";
import { useState } from "react";

const AdminNew = () => {
    const { newId } = useParams();
    console.log(newId);

    const { data, loading, error } = useFetch(`http://127.0.0.1:2024/get/one/news?id=${newId}`);
    console.log(data);

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

    return (
        <div>
            <AdminFieldBorder className="pl-[0px] pr-0 pb-0">
                <div className="flex items-center justify-between my-[40px] px-[40px]">
                    <Link to="/news">
                        <button className="w-[202px] text-[#249D8C] font-semibold text-[26px] h-[66px] rounded-[5px] border-[3px] border-[#249D8C] ">
                            Назад
                        </button>
                    </Link>
                    <button className="bg-[#FF6262] gap-[15px] rounded-[5px] text-[#FFFFFF] font-normal text-[30px] border-[3px] border-[#FF6262] flex items-center justify-center h-[63px] w-[308px]">
                        <img src={trashwhite} alt="" />
                        Delete
                    </button>
                </div>
                <div className="">
                    <div className="flex items-start justify-start gap-[36px]">
                        <div className="flex flex-col items-center gap-[20px] border-[3px] border-[#249D8C] border-b-0 rounded-r-[10px]">
                            <img src={currentImage} className="h-[614px] w-[554px]" />
                            <div className="flex items-center">
                                <div className="flex items-center justify-center gap-[30px]">
                                    {images.map((_, index) => (
                                        <button
                                            key={index}
                                            className={`w-[134px] h-[66px] rounded-[5px] flex items-center justify-center border-[#249D8C] border-[3px] ${activeIndex === index ? "bg-green-500" : ""}`}
                                            onClick={() => handleButtonClick(index)}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                </div>
                            </div>

                        </div>
                        <div className="">
                            <h1 className="text-[#303C3A] text-[40px] font-semibold w-[718px]">{lng === "ru" ? data.TajikNews.title : data.RussianNews.title}</h1>
                            <p>{lng === "ru" ? data.TajikNews.short_info : data.RussianNews.short_info}</p>
                        </div>
                    </div>
                </div>
            </AdminFieldBorder>
        </div>
    );
};

export default AdminNew;
