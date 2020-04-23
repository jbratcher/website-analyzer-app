"use strict";

const Helpers = use("Helpers");
const RawReport = use("App/Models/RawReport");
const AnalyzedReport = use("App/Models/AnalyzedReport");
const ActionStepsList = use("App/Models/ActionStepsList");
const execSync = require("child_process").execSync;

// read lighthouse report and convert to business report
const json = require(Helpers.appRoot("/scripts/utility/json.js"));

class ReportController {
  index() {
    return "Report Index Route";
  }

  async getReports({ params }) {
    const rawReport = require(Helpers.appRoot(
      `/resources/${params.filename}/${params.filename}-lighthouse.json`
    ));
    const analyzedReport = require(Helpers.appRoot(
      `/resources/${params.filename}/${params.filename}-analyzed.json`
    ));
    const actionStepsReport = require(Helpers.appRoot(
      `/resources/${params.filename}/${params.filename}-action-steps.json`
    ));
    let reports = Promise.all([rawReport, analyzedReport, actionStepsReport]);
    return await reports;
  }

  async getRawReport({ params }) {
    const report = require(Helpers.appRoot(
      `/resources/${params.filename}/${params.filename}-lighthouse.json`
    ));
    return await report;
  }

  async getAnalyzedReport({ params }) {
    const report = require(Helpers.appRoot(
      `/resources/${params.filename}/${params.filename}-analyzed.json`
    ));
    return await report;
  }

  async getActionStepsReport({ params }) {
    const report = require(Helpers.appRoot(
      `/resources/${params.filename}/${params.filename}-action-steps.json`
    ));
    return await report;
  }

  /*
   **  Fetch and analyze report by name and url then save to resources/<name> folder
   */
  generateReport({ params }) {
    execSync(
      `npm run fetch ${params.name} https://${params.url} && npm run analyze ${params.name}`
    );
    this.saveReports({ params });
  }

  /*
   ** save a generated report to the database
   */
  async saveReports({ params }) {
    let rawReport = await json.read(
      Helpers.appRoot(`resources/${params.name}/${params.name}-lighthouse.json`)
    );
    let analyzedReport = await json.read(
      Helpers.appRoot(`resources/${params.name}/${params.name}-analyzed.json`)
    );
    let actionStepsList = await json.read(
      Helpers.appRoot(
        `resources/${params.name}/${params.name}-action-steps.json`
      )
    );

    RawReport.findOrCreate({ report: rawReport });
    AnalyzedReport.findOrCreate({ report: analyzedReport });
    ActionStepsList.findOrCreate({ report: actionStepsList });

    return;
  }
}

module.exports = ReportController;
