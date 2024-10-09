
// eslint-disable-next-line react/prop-types
const AdminInput = ({ type, placeholder, name, value, className, onChange, required }) => {
    return (
        <div>
            <input
                className={`${className} h-[69px] rounded-[10px] border-[3px] border-[#249D8C] px-[20px] pt-[10px] placeholder:text-[26px] placeholder:leading-[69px]`}
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
            />

        </div>

    )
}

export default AdminInput
