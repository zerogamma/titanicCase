"use client";

import { useML } from "@/app/hook/useML";
import { ActionButton } from "../../componets/ActionButton";
import { useEffect, useState } from "react";
import { Input } from "@/app/componets/Input";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const userInput = ["Age", "SibSp", "Parch", "Fare"];

export default function Home() {
  const { predictData, data, error } = useML();
  const [showUserInput, setShowUserInput] = useState(false);

  const [responseData, setResponseData] = useState({
    score: "",
    count: "",
    intermsg: "",
    result: "",
  });

  const handlePredict = () => {
    predictData();
  };

  const handleShowUserInput = () => {
    setShowUserInput(!showUserInput);
  };

  const HandlePredictByUserInput = (event: any) => {
    event.preventDefault();
    const body = userInput.reduce(
      (saved, current) => {
        return { ...saved, [current]: +event.target[current].value };
      },
      { Age: 0, SibSp: 0, Parch: 0, Fare: 0 }
    );

    predictData(Object.values(body));
  };

  const getEvaluation = (score: number) => {
    if (score >= 0 && score < 49) return "Poor Training. Re-Train";
    if (score >= 49 && score < 90) return "Success Training.";
    if (score >= 90) return "Success Training, but maybe there is overfitting";
    return "";
  };

  useEffect(() => {
    if (data)
      if (!data.finalResults) {
        toast("not survived")
      }
    setResponseData({
      score: data.score,
      count: data.predictedCount,
      result: data.finalResults ? "survived" : "not survived",
      intermsg: getEvaluation(data.score),
    });
  }, [data]);

  useEffect(() => {
    if (error) throw new Error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center p-8 gap-2">
      <h1>Titanic Case: Predict</h1>
      <ToastContainer />
      <ActionButton
        handleAction={handleShowUserInput}
        text={`${!showUserInput ? "Show" : "Hide"} User Input`}
      />
      {showUserInput ? (
        <form
          onSubmit={HandlePredictByUserInput}
          className="gap-2 flex flex-col"
        >
          {userInput.map((input) => (
            <Input key={uuidv4()} input={input} />
          ))}
          <button
            type="submit"
            className="rounded-lg bg-zinc-400 p-2 text-zinc-100  disabled:bg-slate-300 disabled:text-slate-200"
          >
            Predict
          </button>
        </form>
      ) : (
        <ActionButton handleAction={handlePredict} text={"Predict"} />
      )}

      {data && (
        <div className="flex flex-col items-start w-[55vw]">
          <h2>Prediction:</h2>
          <div className="answer">{responseData.result}</div>
          <h2>Training Score:</h2>
          <div className="answer">{responseData.score}</div>
          <h2>Count predicted:</h2>
          <div className="answer">{responseData.count}</div>
          <h2>Evaluation:</h2>
          <div className="answer">{responseData.intermsg}</div>
        </div>
      )}
    </main>
  );
}
