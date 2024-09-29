import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminInput from "../AdminInput/AdminInput";
import Title from "../Title/Title";
import AdminSubmitButton from "../AdminSubmitButton/AdminSubmitButton";
import { Link } from "react-router-dom";

const Login = () => {
    const { t } = useTranslation();
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const submitData = {
        Phone: phone,
        Password: password,
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(submitData),
            credentials: 'include',
        };

        try {
            const response = await fetch("http://127.0.0.1:2024/login", requestOptions);
            const result = await response.json();

            if (response.ok) {
                setTimeout(() => {
                    navigate("/statisticadd");
                }, 1000);
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
                <Title>{t("Admin.Title.login")}</Title>
                <form className="mt-[60px]" onSubmit={handleSubmit}>
                    <div className="flex items-center justify-center gap-5 flex-col">
                        <AdminInput
                            className="w-[676px]"
                            type="tel"
                            placeholder={"+992 | Телефон"}
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required={true}
                        />
                        <AdminInput
                            className="w-[676px]"
                            type="password"
                            placeholder="Пароль"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required={true}
                        />
                    </div>
                    <Link to="/updatePassword">
                        <button
                            type="button"
                            className="border-[#E77D67] mt-[15px] px-[30px] py-[10px] border-[3px] rounded-[10px] text-[#E77D67]"
                        >
                            Забили пароль?
                        </button>
                    </Link>
                    <div className="flex items-center justify-center mt-[30px]">
                        <AdminSubmitButton submitData={submitData} url="http://127.0.0.1:2024/login" />
                    </div>
                    {isLoading && <p>Loading...</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;
