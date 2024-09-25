
// eslint-disable-next-line react/prop-types
const Title = ({ children }) => {
    return (
        <div className="flex items-center justify-center my-[30px]">
            <h1 className="font-semibold text-[30px] text-[#249D8C]">{children}</h1>
        </div>
    )
}

export default Title
