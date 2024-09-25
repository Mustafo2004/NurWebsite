import LanguageSelector from "../../../Language/LanguageSelector"
const AdminHeader = () => {
    return (
        <div className="px-[50px]">

            <div className="mb-[50px]  border-[4px] border-[#249D8C] rounded-t-[40px] rounded-b-[10px] h-[90px] bg-[#249D8C]  px-[60px] flex items-center   justify-end">

                <div className="flex items-center justify-center w-[80px] h-[50px] rounded-[10px] bg-[#E77D67]">

                    <LanguageSelector />
                </div>
            </div>
        </div>
    )
}

export default AdminHeader
