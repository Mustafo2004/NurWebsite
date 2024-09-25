import { useState } from 'react';
import styles from './partner.module.css';
import { useTranslation } from 'react-i18next';

export default function AddPartner() {
    const { t } = useTranslation();
    const [photoPath, setPhotoPath] = useState(""); // To store file name
    const [base64File, setBase64File] = useState(""); // To store base64-encoded file

    // Handle file selection and conversion to base64
    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Get the first uploaded file

        if (file) {
            setPhotoPath(file.name); // Set the file name to the input field

            const reader = new FileReader();

            // When file reading is done, convert to base64
            reader.onloadend = function () {
                const rawData = reader.result;

                // Convert the file data to base64 in chunks
                const chunkSize = 100536;
                let offset = 0;
                let base64String = "";

                while (offset < rawData.byteLength) {
                    const chunk = rawData.slice(offset, offset + chunkSize);
                    base64String += btoa(String.fromCharCode.apply(null, new Uint8Array(chunk)));
                    offset += chunkSize;
                }

                // Store the base64 string
                setBase64File(base64String);
            };

            // Read the file as an array buffer (necessary for conversion to base64)
            reader.readAsArrayBuffer(file);
        }
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        // Prepare the payload with the base64-encoded file
        const newPartner = {
            Logo: base64File
        };

        // POST request
        fetch("http://127.0.0.1:2020/add/partner", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPartner),
            credentials: 'include', // If cookies are needed
        })
            .then(response => {
                if (response.ok) {
                    alert("Success");
                } else {
                    alert("Error");
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.submit}>
                <div className={styles.parentPhoto}>
                    <input
                        className={styles.photo}
                        type="text"
                        placeholder="Image"
                        value={photoPath}
                        readOnly
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        id="photo-upload"
                    />
                    <label className={styles.buttonPhoto} htmlFor="photo-upload">
                        Choose photo
                    </label>
                </div>
                <button
                    type="submit"
                    className={styles.buttonSubmit}>
                    {t("Admin.submit")}
                </button>
            </div>
        </form>
    );
}