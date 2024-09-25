import trashIcon from "../../../assets/Icons/trash.svg";

// eslint-disable-next-line react/prop-types
const AdminButtonDelete = ({ onClick }) => {
    return (
        <div>
            <button
                type="button"
                className="w-[100px] h-[53px] bg-white border-[#FF6262] border-[2px] flex items-center justify-center rounded-[5px]"
                aria-label="Delete"
                onClick={onClick}
            >
                <img src={trashIcon} alt="Trash Icon" />
            </button>
        </div>
    );
};

export default AdminButtonDelete;
