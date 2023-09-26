import { parse } from "csv-parse";
import { promises as fs } from "fs";
import { finished } from "stream/promises";

export const processFile = async (
  type: string,
  path: string,
  removeAttribute: string[]
) => {
  let data: any[] = [];
  let header: any = {};
  const content = await fs.readFile(path);
  const parsed = parse(content, { columns: false, trim: true });
  let mediaAge = 0;
  let countAge = 0;
  let mediaFare = 0;
  let countFare = 0;

  parsed.on("readable", () => {
    let chunk;
    let positions = [] as number[];
    //Hard code of the media to fill null value the correct way will be for any numerical value get the media and fill the null value.

    chunk = parsed.read();

    //Getting the position of the attribute to be removed, and the position of the numerical attribute.
    chunk?.forEach((attribute: string, index: number) => {
      if (removeAttribute.find((attr) => attr === attribute))
        positions.push(index);
      else {
        //Logic to keep track of the position of the attribute that will no be filtered.
        const attributePos = { [attribute]: index };
        header = { ...header, ...attributePos };
      }
    });

    while (null !== (chunk = parsed.read())) {
      let filterChunk = chunk.reduce(
        (accum: number[], current: string, index: number) => {
          if (index === 0) return accum;
          if (!positions.find((removeIndex) => removeIndex === index))
            accum.push(+current);
          //Hard Code of the position of the Age and Fare to calculate media
          if (header.Age === index) {
            mediaAge += +current;
            countAge += 1;
          }
          if (header.Fare === index) {
            mediaFare += +current;
            countFare += 1;
          }
          return accum;
        },
        []
      );
      data.push(filterChunk);
    }
  });

  await finished(parsed);
  console.log(header);
  return fillNull(
    Object.keys(header),
    data,
    Math.round(mediaAge / countAge),
    Math.round(mediaFare / countFare),
    type
  );
};

// function to fill Null data. HardCode for Age and Fare.
function fillNull(
  header: string[],
  data: any[],
  Age: number,
  Fare: number,
  type: string
) {
  const AgeIndex = header.findIndex((att) => att === "Age");
  const FareIndex = header.findIndex((att) => att === "Fare");

  return data.map((toValidate, index) => {
    if (!toValidate[AgeIndex]) toValidate.splice(AgeIndex, 1, Age);
    if (!toValidate[FareIndex]) toValidate.splice(FareIndex, 1, Fare);
    return toValidate;
  });
}
// Serialize the model for future use.
export const saveModel = (JSONModel: string) => {
  fs.writeFile("pickle.json", JSONModel, "utf8");
};

// Deserialize the model.
export const getModel = async () => {
  const readFile = await fs.readFile("pickle.json", "utf8");
  return JSON.parse(readFile);
};

// Calculation to get the efficiency of the model in the prediction.
export const scoreResult = (base: number[], predicted: number[]) => {
  const matchedCount = base.reduce((total, result, index) => {
    if (result === predicted[index]) return total + 1;
    return total;
  }, 0);
  return (matchedCount * 100) / base.length / 100;
};
