"use client";

import { ActionButton } from "./componets/ActionButton";
import { useML } from "./hook/useML";

export default function Home() {
  const { trainData, data } = useML();

  const handleTrain = () => {
    trainData();
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 gap-2">
      <h1>Titanic Case: Train</h1>
      <ActionButton handleAction={handleTrain} text={"Train"} />
      {data && (
        <div className="flex flex-col items-start w-[55vw]">
          <h2>Training Score:</h2>
          <div className="answer">{data.toFixed(2)}</div>
        </div>
      )}
    </main>
  );
}
