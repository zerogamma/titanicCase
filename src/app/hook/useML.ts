"use client";

import { useState } from "react";

const myHeaders = new Headers({
  "Content-Type": "application/json",
  Accept: "application/json",
});

export const useML = () => {
  const [data, setData] = useState<any>();
  const [error, setError] = useState<string>("");

  const trainData = async () => {
    const res = await fetch("http://localhost:3000/api/train", {
      headers: myHeaders,
      method: "POST",
    });

    const newData = await res.json();

    setData(newData);
  };

  const predictData = async (body?: any) => {
    const res = await fetch("http://localhost:3000/api/predict", {
      headers: myHeaders,
      method: "POST",
      body: JSON.stringify(body),
    });

    const newData = await res.json();

    if (res.status === 200) {
      setData(newData);
    } else {
      setError(newData.error);
    }
  };

  return { data, trainData, predictData, error };
};
