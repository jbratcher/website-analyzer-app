// run lighthouse report for passed <name> <url> arguments
const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");
const fs = require("fs");

const website_name = process.argv[2];
const website_url = process.argv[3];

const storeData = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data, null, 4));
  } catch (err) {
    console.error(err);
  }
};

function launchChromeAndRunLighthouse(url, opts, config = null) {
  return chromeLauncher
    .launch({ chromeFlags: opts.chromeFlags })
    .then((chrome) => {
      opts.port = chrome.port;
      return lighthouse(url, opts, config).then((results) => {
        // use results.lhr for the JS-consumable output
        // https://github.com/GoogleChrome/lighthouse/blob/master/types/lhr.d.ts
        // use results.report for the HTML/JSON/CSV output as a string
        // use results.artifacts for the trace/screenshots/other specific case you need (rarer)
        return chrome.kill().then(() => results.lhr);
      });
    });
}

const opts = {
  chromeFlags: [],
};

if (process.argv.some((arg) => arg === "--help" || arg === "-h")) {
  console.log("*".repeat(10));
  console.log("Fetch Report Help\n");
  console.log("*".repeat(10));
  console.log("1st argument: Website Name\n");
  console.log("2nd Argument: Website URL");
  return;
}

// Fetch report
launchChromeAndRunLighthouse(website_url, opts).then((results) => {
  // store data to json file
  if (!fs.existsSync(`resources/${website_name}`)) {
    fs.mkdirSync(`resources/${website_name}`, { recursive: true });
  }
  // append report name to results
  results = {
    name: website_name,
    ...results,
  };
  // create temp file with raw report
  storeData(
    results,
    `resources/${website_name}/${website_name}-lighthouse.json`
  );
});
