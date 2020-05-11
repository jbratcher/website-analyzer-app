// delete temporary json files after storing to database

const fs = require("fs");

const filename = process.argv[2];

const folder = `resources/${filename}/`;
const rawReport = `resources/${filename}/${filename}-lighthouse.json`;
const analyzedReport = `resources/${filename}/${filename}-analyzed.json`;
const actionStepsList = `resources/${filename}/${filename}-action-steps.json`;

// delete individual reports
fs.unlinkSync(rawReport);
fs.unlinkSync(analyzedReport);
fs.unlinkSync(actionStepsList);

// delete folder
fs.rmdir(folder, () => console.log(`Deleted folder for: ${filename}`));
