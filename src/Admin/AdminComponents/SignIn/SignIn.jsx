import { useState } from "react";
import { useTranslation } from "react-i18next";
import Title from "../Title/Title";
import AdminInput from "../AdminInput/AdminInput";
import AdminSubmitButton from "../AdminSubmitButton/AdminSubmitButton";

const SignIn = () => {
    const { t } = useTranslation();

    const [formData, setFormData] = useState({
        ru: {
            name: '',
            surname: '',
            email: '',
            phone: '',
            permission: '',
            password: ''
        },
        en: {
            name: '',
            surname: '',
            email: '',
            phone: '',
            permission: '',
            password: ''
        }
    });

    // Handler for input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form data:", formData);
    };

    return (
        <div className="border-[#249D8C] border-[4px] h-[870px] rounded-[10px]">
            <Title>{t("Admin.Title.signIn")}</Title>
            <form className="flex items-center justify-center flex-col" onSubmit={handleSubmit}>
                <div className="flex items-center flex-col gap-5 justify-center mt-[3px]">
                    <AdminInput
                        className="w-[676px]"
                        type="text"
                        placeholder="Имя"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                    <AdminInput
                        className="w-[676px]"
                        type="text"
                        placeholder="Фамилия"
                        name="surname"
                        value={formData.surname}
                        onChange={handleInputChange}
                        required
                    />
                    <AdminInput
                        className="w-[676px]"
                        type="email"
                        placeholder="Электронная почта"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    <AdminInput
                        className="w-[676px]"
                        type="tel"
                        placeholder={"+992 | Телефон"}
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                    />
                    <AdminInput
                        className="w-[676px]"
                        type="text"
                        placeholder="Разрешение"
                        name="permission"
                        value={formData.permission}
                        onChange={handleInputChange}
                        required
                    />
                    <AdminInput
                        className="w-[676px]"
                        type="password"
                        placeholder="Пароль"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <AdminSubmitButton submitData={handleSubmit} url="" />
            </form>
        </div>
    );
};

export default SignIn;
