import React, { useEffect, useState } from "react";
import useStore from "../zustand/store";

export default function fetchShoes() {
  const { setShoes } = useStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/shoes");
        console.log("API Response:", response);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Shoes data:", data);

        // Ensure data is an array
        if (Array.isArray(data)) {
          setShoes(data);
        } else {
          console.warn("API returned non-array data:", data);
          setShoes([]);
        }
      } catch (err) {
        console.error("Error fetching shoes:", err);
        setError(err.message);

        // Set empty array as fallback
        setShoes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
}
