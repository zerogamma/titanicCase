"use client"; // Error components must be Client Components

import { useEffect, useState } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
    setErrorMessage(error.message);
  }, [error]);

  return (
    <div className="h-screen flex pt-40 flex-col items-center">
      <h2>Something went wrong!</h2>
      <h4 className="text-gray-500">{errorMessage}</h4>
      <button
        className="btn-base mt-5"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
