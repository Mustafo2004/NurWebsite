
// eslint-disable-next-line react/prop-types
const AdminStatisticsButton = ({ children, active, onClick, className }) => {
    return (
        <div>
            <button
                onClick={onClick}
                className={`${className} h-[59px] flex items-center justify-center py-[10px] px-[50px] text-[#303C3A] rounded-[5px]  font-medium text-[26px]  ${active ? 'bg-[#249D8C] text-[#FFFFFF]' : 'border-[3px] border-[#249D8C]'
                    }`}
            >
                {children}
            </button>
        </div>
    )
}

export default AdminStatisticsButton
