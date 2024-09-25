import { useState } from "react";

const Post = (url) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    const postData = async (data) => {
        setLoading(true);
        setError(null);

        let requestOptions = {
            method: "POST",
            credentials: 'include',
            redirect: "follow",
        };

        if (data instanceof FormData) {
            requestOptions.body = data;  
        } else {
            requestOptions.headers = {
                "Content-Type": "application/json",
            };
            requestOptions.body = JSON.stringify(data); 
        }

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

    return { postData, response, loading, error };
};

export default Post;
