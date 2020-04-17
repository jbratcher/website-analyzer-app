// json related utilities

// imports
const fs = require("fs");
const util = require("../utility/to-camel-case.js"); //kebab to camel case utility

module.exports = {
  format: function (filename, filenameAppend) {
    let rawData;
    if (
      fs.existsSync(`resources/${filename}/${filename}${filenameAppend}.json`)
    ) {
      rawData = fs.readFileSync(
        `resources/${filename}/${filename}${filenameAppend}.json`
      );
    } else {
      console.log(`There is no lighthouse report for ${filename}`);
      return null;
    }
    let rawJson = JSON.parse(rawData);
    let formattedJson = util.keysToCamel(rawJson);
    return formattedJson;
  },
  read: function (filename) {
    // import master action step list
    let rawJson = fs.readFileSync(filename);
    let parsedJson = JSON.parse(rawJson);
    return parsedJson;
  },
  write: function (filename, filenameAppend, json) {
    // write json object to report file
    let prettyJson = JSON.stringify(json, null, 4);
    fs.writeFileSync(
      `resources/${filename}/${filename}${filenameAppend}.json`,
      prettyJson
    );
  },
};
