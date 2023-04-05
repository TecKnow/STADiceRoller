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