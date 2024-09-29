
// eslint-disable-next-line react/prop-types
const AdminFieldBorder = ({ children, className }) => {
    return (
        <div >
            {/* w-[1400px]   */}
            <div className={`min-h-[870px] pb-[20px]   border-[4px] pl-[40px]    rounded-[4px] overflow-hidden border-[#249D8C] ${className}`}>
                {children}
            </div>
        </div>
    )
}

export default AdminFieldBorder
