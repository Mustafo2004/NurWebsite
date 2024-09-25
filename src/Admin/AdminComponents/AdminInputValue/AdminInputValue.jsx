import AdminButtonDelete from '../AdminButtonDelete/AdminButtonDelete';

const AdminInputValue = ({
    // eslint-disable-next-line react/prop-types
    name,
    // eslint-disable-next-line react/prop-types
    description,
    // eslint-disable-next-line react/prop-types
    className,
    // eslint-disable-next-line react/prop-types
    userId,
}) => {

    const handleDeleteUser = (userId) => {
        console.log(`User with ID ${userId} deleted.`);
    };

    return (
        <div className="h-[69px] w-[1300px] rounded-[10px] border-[3px] border-[#249D8C] flex items-center justify-between px-[20px]">
            <div
                className={`${className} bg-transparent w-full focus:outline-none`}
            >
                <p>{name}</p>
                <p>{description}</p>

            </div>
            <AdminButtonDelete deleteAction={() => handleDeleteUser(userId)} />
        </div>
    );
};



export default AdminInputValue;
