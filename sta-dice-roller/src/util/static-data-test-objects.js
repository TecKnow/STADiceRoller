import fs from "fs";
import path from "path";

export default function loadStaticDataFromFile() {
  const staticDirectoryPath = path.join(process.cwd(), "static-data");

  const successPath = path.join(staticDirectoryPath, "successes.json");
  const complicationsPath = path.join(
    staticDirectoryPath,
    "complications.json"
  );

  const successFileContents = fs.readFileSync(successPath, "utf8");
  const complicationsFileContents = fs.readFileSync(complicationsPath, "utf8");

  const successesJSONObj = JSON.parse(successFileContents);
  const complicationsJSONObj = JSON.parse(complicationsFileContents);

  return { successesJSONObj, complicationsJSONObj };
}

export function flattenSucessesJSONObj(successesJSONObj){
          // successesJSONObj[numDice][focus][attribute][discipline]
          const successTestArgs = Array();
          Object.keys(successesJSONObj).forEach((numDice) => {
            Object.keys(successesJSONObj[numDice]).forEach((focus) => {
              if (focus == "true") {
                Object.keys(successesJSONObj[numDice][focus]).forEach(
                  (attribute) => {
                    Object.keys(
                      successesJSONObj[numDice][focus][attribute]
                    ).forEach((discipline) => {
                      const res = successesJSONObj[numDice][focus][attribute][discipline]
                      successTestArgs.push([
                        numDice,
                        true,
                        attribute,
                        discipline,
                        res,
                      ]);
                    });
                  }
                );
              } else {
                Object.keys(successesJSONObj[numDice][focus]).forEach(
                  (targetNumber) => {
                    successTestArgs.push([
                      numDice,
                      false,
                      targetNumber,
                      successesJSONObj[numDice][focus][targetNumber],
                    ]);
                  }
                );
              }
            });
          });
          return successTestArgs;
}

export function FlattenComplicationsJSONObj(complicationsJSONObj){
  const complicationsTestArgs = Array();
  Object.keys(complicationsJSONObj).forEach((numDice)=>{
    Object.keys(complicationsJSONObj[numDice]).forEach((complicationsRange)=>{
      const res = complicationsJSONObj[numDice][complicationsRange]
      complicationsTestArgs.push([numDice, complicationsRange, res]);
    });
  });
  return complicationsTestArgs;
}