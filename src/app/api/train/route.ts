import { NextResponse } from "next/server";
import _ from "lodash";
import { Matrix } from "ml-matrix";
import LogisticRegression from "ml-logistic-regression";
import { processFile, saveModel, scoreResult } from "../utils/prepareFile";
import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";

function GetResultValidation(toRemoveValidationData: any[]) {
  let Y_data: any[] = [];
  const X_data = toRemoveValidationData.map((data) => {
    Y_data.push(data.shift());
    return data;
  });
  return {
    Y_data,
    X_data,
  };
}

function SplitAndSuffle(training: any) {
  const suffledData = _.shuffle(training);
  const testDataCount = Math.trunc(training.length * 0.3);
  const testSuffledData = suffledData.splice(0, testDataCount);

  const trainData = GetResultValidation(suffledData);
  const testData = GetResultValidation(testSuffledData);

  return {
    X_train: new Matrix(trainData.X_data),
    X_test: new Matrix(testData.X_data),
    y_train: Matrix.columnVector(trainData.Y_data),
    y_test: testData.Y_data,
  };
}

export async function POST(req: any) {
  const res = await req.text();
  try {
    const removeAttribute = res
      ? JSON.parse(res)
      : ["Pclass", "Sex", "Embarked", "Cabin", "PassengerId", "Name", "Ticket"];

    const trainData = await processFile(
      "train",
      `src/data/titanic/train.csv`,
      removeAttribute
    );

    const { X_train, X_test, y_train, y_test } = SplitAndSuffle(trainData);

    const logreg = new LogisticRegression({
      numSteps: 1000,
      learningRate: 5e-3,
    });

    logreg.train(X_train, y_train);

    const finalResults = logreg.predict(X_test);

    const score = scoreResult(finalResults, y_test);

    saveModel(JSON.stringify(logreg.toJSON()));

    return NextResponse.json(score);
  } catch (e) {
    return NextResponse.json("Something went wrong");
  }
}
