import { Link, useParams } from "react-router-dom"
import trashwhite from "../../../assets/Icons/trashwhite.png"
import useFetch from "../../../Hooks/Fetching";
import AdminFieldBorder from "../AdminFieldBorder/AdminFieldBorder";

const AdminNew = () => {
    const { data, loading, error } = useFetch("http:127.0.0.1:2024/get/news");
    const { newId } = useParams();
    const item = data?.find(each => String(each.id) === String(newId));
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!item) return <p>No team member found.</p>;
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
                <div>

                </div>
            </AdminFieldBorder >
        </div>
    )
}

export default AdminNew
