import React, { useEffect, useState } from 'react'
import useStore from '../zustand/store';

export default function fetchShoes() {
    const { setShoes } = useStore()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/shoes');
                console.log(response);

                const data = await response.json()
                setShoes(data);
            } catch (err) {
                console.log(err);

                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

}
