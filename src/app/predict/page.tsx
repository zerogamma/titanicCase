"use client";

import { TrainButton } from "../componets/TrainButton";

export default function Home() {
  const handleTrain = () => {};
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <h1>Titanic Case</h1>
      <h2>Predict</h2>
      <TrainButton handleTrain={handleTrain} />
    </main>
  );
}
