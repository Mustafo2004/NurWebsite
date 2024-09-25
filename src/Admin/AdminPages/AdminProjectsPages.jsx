import AdminFieldBorder from "../AdminComponents/AdminFieldBorder/AdminFieldBorder"
import AdminProjects from "../AdminComponents/AdminProjects/AdminProjects"

const AdminProjectsPages = () => {
    return (
        <div>
            <AdminFieldBorder className="">
                {
                    <div>
                        <AdminProjects />
                    </div>
                }
            </AdminFieldBorder>
        </div>
    )
}

export default AdminProjectsPages
