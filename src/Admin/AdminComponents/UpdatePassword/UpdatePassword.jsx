import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminInput from "../AdminInput/AdminInput";
import Title from "../Title/Title";
import AdminSubmitButton from "../AdminSubmitButton/AdminSubmitButton";

const UpdatePassword = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const raw = {
        "email": email,
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(raw),
            credentials: 'include',
        };

        try {
            const response = await fetch(`http://127.0.0.1:2024/get/email?email=${encodeURIComponent(email)}`, requestOptions);
            const result = await response.json();

            if (response.ok) {
                navigate("/updatecode");
            }

            console.log("Success:", result);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="border-[#249D8C] border-[4px] h-[870px] rounded-[10px] flex items-center justify-between flex-col pb-[40px]">
            <div>
                <Title>{t("Admin.Title.updatePaswword")}</Title>
                <form className="mt-[60px]" onSubmit={handleSubmit}>
                    <div className="flex items-center justify-center gap-5 flex-col">
                        <AdminInput
                            className="w-[676px]"
                            type="email"
                            placeholder="Электронная почта"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-center mt-4">
                        <AdminSubmitButton
                            onClick={raw}
                            url={`http://127.0.0.1:2024/get/email?email=${encodeURIComponent(email)}`}
                        />

                    </div>
                    {isLoading && <p>Loading...</p>}
                </form>
            </div>
        </div>
    );
};

export default UpdatePassword;
