// read lighthouse report and convert to business report
const json = require("../utility/json.js");

// import master action step list
let actionSteps = json.read("resources/action-steps/action-steps.json");

// 1st argument passed
const filename = process.argv[2];

// read lighthouse report by name, parse and format for analysis
let formattedJson = json.format(filename, "-lighthouse");

// iterate over audit returning those with actionable scores
let auditList = {}; // object container for individual audit objects
let audits = {}; // individual audit object (named "audits" for .json file object name)

// returns index named objects where score < 1 but not null
let failingAudits = function () {
  Object.values(formattedJson.audits).map((key) => {
    if (key.id) {
      if (key.score < 1 && key.score !== null) {
        (audits = Object.assign(audits, { [key.id]: key })),
          (auditList = { ...auditList, audits });
      }
    }
  });
};

failingAudits();

// calculate overall score
let totalScore = 0;
let scores = [];

let overallScore = function () {
  // maps over category object
  Object.values(formattedJson.categories).map((category) => {
    if (category.score) {
      let normalizedScore = category.score * 100;
      scores.push(normalizedScore);
    }
    // sum scores and average
    totalScore = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(0);
  });
};

overallScore();

// build json object with pertinent company/website info and action step info
auditList = {
  name: filename[0].toUpperCase() + filename.slice(1),
  url: formattedJson.requestedUrl,
  totalScore: totalScore,
  ...auditList,
};

// write json object to report file
json.write(filename, "-analyzed", auditList);

// Read actionable improvement fields
let analyzedJson = json.read(`resources/${filename}/${filename}-analyzed.json`);

// // If these fields match any action steps, add action step to website's list of action steps
// let matches = [];

// // map over each key in the report, try to match it to a action step, and add it to a list
// // A lighthouse audit score field of "1" is passing, "0" is failing, less than 1 needs attention
// let actionStepsMatching = function () {
//   Object.values(analyzedJson).map((key) => {
//     //returns named object { "name": {...} }
//     Object.entries(key).map((key) => {
//       // returns array of name and object [ "name": {...} ]
//       if (key[1].id) {
//         actionSteps.map((step) => {
//           // match to audit id (ex. "service-worker") to action steps "matches" field
//           if (step.matches === key[1].id) {
//             matches.push(Object.assign(step));
//           }
//         });
//       }
//     });
//   });
// };

// iterate over audit returning those with actionable scores
let auditMatchList = {}; // object container for individual audit objects
let auditsMatched = {}; // individual audit object (named "audits" for .json file object name)

// returns index named objects where score < 1 but not null
let actionStepsMatchingObject = function () {
  Object.values(analyzedJson).map((key) => {
    Object.entries(key).map((key) => {
      if (key[1].id) {
        console.log(key[1]);
        actionSteps.map((step) => {
          // match to audit id (ex. "service-worker") to action steps "matches" field
          if (step.matches === key[1].id) {
            (auditsMatched = Object.assign(auditsMatched, {
              [key[1].id]: key,
            })),
              (auditMatchList = { ...auditMatchList, auditsMatched });
          }
        });
      }
    });
  });
};

actionStepsMatchingObject();

// write action list to it's own file
json.write(filename, "-action-steps", auditMatchList);

// Use saved report as read-only JSON API for display to dashboard
let dashboardJson = json.read(
  `resources/${filename}/${filename}-action-steps.json`
);

// Create user dashboard to display scores and action step list (explanations of scores?)
// Stack
// Front: Nuxt/Netlify
// Back: Adonis/Heroku
// CRUD for reports
// Create - new report by name and URL input
// Read - display scores in graph (chart.js?)
// Update - rerun report for a name/URL
// Delete - delete unused reports
// RUD for actions steps (todo list style)
// Action steps are auto created (no user create function)
// Make alternate list for user create steps?
// Read - list action steps
// Update - mark action step as completed
// Delete - removed action step from list
