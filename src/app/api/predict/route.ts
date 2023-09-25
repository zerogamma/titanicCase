import { NextResponse } from "next/server";
import { getModel, processFile, scoreResult } from "../utils/prepareFile";
import LogisticRegression from "ml-logistic-regression";
import { Matrix } from "ml-matrix";

export async function POST(req: Request) {
  const res = await req.text();

  try {
    const predictByPrompt = res ? JSON.parse(res) : [];

    let predictData = [];

    if (!predictByPrompt.length) {
      predictData = await processFile("test", `src/data/titanic/test.csv`, [
        "Pclass",
        "Sex",
        "Embarked",
        "Cabin",
        "PassengerId",
        "Name",
        "Ticket",
      ]);
    } else predictData = predictByPrompt;

    const savedModel = await getModel();

    const model = LogisticRegression.load(savedModel);

    const finalResults = model.predict(new Matrix(predictData));

    const score = scoreResult(finalResults, predictData);

    return NextResponse.json({
      score: score,
      predictedCount: finalResults.length,
    });
  } catch (e: any) {
    if (
      e.message ===
      "ENOENT: no such file or directory, open 'modelTitanic.json'"
    )
      return NextResponse.json({ code: 404, message: "model no found" });
    return NextResponse.json("Something went wrong");
  }
}
