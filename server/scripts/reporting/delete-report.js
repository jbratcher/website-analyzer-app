const fs = require("fs");
const json = require("../utility/json.js");

// 1st argument passed
const filename = process.argv[2];
const folder = `resources/${filename}/`;
const rawReport = `resources/${filename}/${filename}-lighthouse.json`;
const analyzedReport = `resources/${filename}/${filename}-analyzed.json`;
const actionStepsList = `resources/${filename}/${filename}-action-steps.json`;

fs.unlinkSync(rawReport);
fs.unlinkSync(analyzedReport);
fs.unlinkSync(actionStepsList);

fs.rmdir(folder, () => console.log(`Deleted folder for: ${filename}`));
