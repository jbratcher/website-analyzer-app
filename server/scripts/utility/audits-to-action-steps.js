// utility to help programmatically convert lighthouse audits to action steps instead of manually copying them
// generated action steps will still need the title, description, and actionStep properties modified for user readbility in reporting

const fs = require("fs");
const util = require("./to-camel-case.js"); //kebab to camel case utility

// 1st argument passed
const filename = process.argv[2];

// if action steps file already exists, confirm continue
if (fs.existsSync(`./resources/action-steps/action-steps.json`)) {
  // TODO: add user input for conditional overwriting
}

// read lighthouse report by name, parse and format for analysis
let rawdata = fs.readFileSync(`./${filename}/${filename}-lighthouse.json`);
let rawJson = JSON.parse(rawdata);
let formattedJson = util.keysToCamel(rawJson);

const actionStepsList = [];

let actionStep = {};

// transform lighthouse audit json to custom actionStep object
Object.entries(formattedJson.audits).map((key) => {
  if (key[1].id) {
    // create dynamic key as new object
    actionStep[key[0]] = {};
    actionStep[key[0]].refName = util.toCamel(key[1].id);
    actionStep[key[0]].title = key[1].title;
    actionStep[key[0]].description = key[1].description;
    actionStep[key[0]].actionStep = "";
    actionStep[key[0]].matches = key[1].id;
    // add each step to array as a new object
    actionStepsList.push(Object.assign(actionStep[key[0]]));
  }
});

// write action list to it's own file
let customizedActionStepsJson = JSON.stringify(actionStepsList, null, 4);
fs.writeFileSync(
  `./resources/action-steps/action-steps.json`,
  customizedActionStepsJson
);
