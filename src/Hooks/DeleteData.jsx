import { useState } from "react";

const DeleteData = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [responseDelete, setResponse] = useState(null);

    const deleteData = async (url) => {
        console.log(url, "Id catch");

        setLoading(true);
        setError(null);

        const requestOptions = {
            method: "DELETE",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
        };

        try {
            const res = await fetch(url, requestOptions);
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const result = await res.json();
            setResponse(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { deleteData, responseDelete, loadingDelete: loading, errorDelete: error };
};

export default DeleteData;