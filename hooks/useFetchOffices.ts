import { useState, useEffect } from "react";
import { OfficeData } from "@/types/common";

const useFetchData = () => {
    const [data, setData] = useState<Array<OfficeData>>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("api/offices");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const result = await response.json();
                setData(result);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleChangeState = (id: number, status: boolean) => {
        let updated = false;
        const newData = data.map((item) => {
            if (!updated && item.id === id) {
                updated = true;
                return { ...item, online: status };
            }
            return item;
        });
        setData(newData);
    };

    return { data, loading, error, handleChangeState };
};

export default useFetchData;
