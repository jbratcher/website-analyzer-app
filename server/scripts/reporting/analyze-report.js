// read lighthouse report and convert to business report

const json = require("../utility/json.js");

// import master action step list
let actionSteps = json.read("resources/action-steps/action-steps.json");

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
  name: filename,
  url: formattedJson.requestedUrl,
  created_at: formattedJson.created_at,
  totalScore: totalScore,
  ...auditList,
};

// write json object to report file
json.write(filename, "-analyzed", auditList);

// Read actionable improvement fields
let analyzedJson = json.read(`resources/${filename}/${filename}-analyzed.json`);

// iterate over audit returning those with actionable scores
let auditMatchList = {}; // object container for individual audit objects
let auditsMatched = {}; // individual audit object (named "audits" for .json file object name)

// returns index named objects where score < 1 but not null
let actionStepsMatchingObject = function () {
  Object.values(analyzedJson).map((key) => {
    Object.entries(key).map((key) => {
      if (key[1].id) {
        actionSteps.map((step) => {
          // match to audit id (ex. "service-worker") to action steps "matches" field
          if (step.matches === key[1].id) {
            (auditsMatched = Object.assign(auditsMatched, {
              [key[1].id]: key[1],
            })),
              (auditMatchList = { ...auditMatchList, auditsMatched });
          }
        });
      }
    });
  });
};

auditMatchList = {
  name: filename,
  ...auditMatchList,
};

actionStepsMatchingObject();

// write action list to it's own file
json.write(filename, "-action-steps", auditMatchList);
