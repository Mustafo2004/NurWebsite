import { useState } from "react";
import styles from "./AdminumbitButtom.module.css";

// eslint-disable-next-line react/prop-types
const AdminSubmitButton = ({ submitData, url }) => {
    const [modalState, setModalState] = useState({ message: '', class: '', show: false });

    const handleSubmit = async () => {
        try {

            const requestData = submitData

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestData),
                credentials: "include"
            });

            if (response.ok) {
                console.log("if", response);

                const result = await response.text();
                console.log("result", result);

                setModalState({ message: 'Отправка успешна!', class: styles.success, show: true });
                console.log("Success:", result);
            } else {
                console.log("else", response);
                const errorData = await response.text();
                throw new Error(`Ошибка отправки: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            setModalState({ message: "error.message", class: styles.error, show: true });
            console.error("Error:", error);
        }
    };

    // nurbackend@gmail.com

    const handleClickOutside = (e) => {
        if (e.target.classList.contains(styles.modal)) {
            setModalState((prev) => ({ ...prev, show: false }));
        }
    };

    return (
        <div>
            <button onClick={handleSubmit} className={styles.submitButton}>
                Отправить
            </button>

            {modalState.show && (
                <div className={styles.modal} onClick={handleClickOutside}>
                    <div className={`${styles.modalContent} ${modalState.class}`}>
                        <p>{modalState.message}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminSubmitButton;
