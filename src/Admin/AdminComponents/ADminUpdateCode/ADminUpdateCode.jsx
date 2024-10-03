import { useTranslation } from "react-i18next";
import Title from "../Title/Title";
import AdminInput from "../AdminInput/AdminInput";
import { useState } from "react";
import AdminSubmitButton from "../AdminSubmitButton/AdminSubmitButton";
import { useNavigate } from "react-router-dom";

const AdminUpdateCode = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const raw = {
    code: code,
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
      const response = await fetch("http://127.0.0.1:2024/verify/code?email=nurbackend@gmail.com", requestOptions);
      console.log("Response Status:", response.status);
      const result = await response.json();
      console.log("Response Body:", result);

      if (response.ok) {
        // Navigate immediately without delay on success
        navigate("/statisticadd");
      } else {
        console.log("Failed response: ", response.status);
      }

    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const { t } = useTranslation();

  return (
    <div>
      <div className="border-[#249D8C] border-[4px] h-[870px] rounded-[10px] flex items-center justify-between flex-col pb-[40px]">
        <div>
          <Title>{t("Admin.Title.updatePaswword")}</Title>
          <form onSubmit={handleSubmit}>
            <label>
              <p className="ml-[20px] mb-[5px] text-[24px] font-normal">Введите код</p>
              <AdminInput
                className="w-[676px]"
                type="text"
                placeholder="Код"
                required={true}
                name="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <span className="text-[#FF0000] font-normal text-[16px]">
                *Пароль должен состоять из 8 символов
              </span>
            </label>
            <div className="flex items-center justify-center">
              <AdminSubmitButton submitData={raw} url="http://127.0.0.1:2024/verify/code?email=nurbackend@gmail.com" />
              {isLoading && <p>Loading...</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminUpdateCode;
