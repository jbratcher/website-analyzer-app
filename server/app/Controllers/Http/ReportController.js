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

  /*
   **  Get all reports by name
   */
  async getReports({ params }) {
    const rawReport = await RawReport.query()
      .where("name", params.filename)
      .fetch();
    const analyzedReport = await AnalyzedReport.query()
      .where("name", params.filename)
      .fetch();
    const actionStepsList = await ActionStepsList.query()
      .where("name", params.filename)
      .fetch();
    let reports = await Promise.all([
      rawReport,
      analyzedReport,
      actionStepsList,
    ]);
    return reports;
  }

  /*
   **  Get a Raw Report by name
   */
  async getRawReport({ params }) {
    const rawReport = await RawReport.query()
      .where("name", params.filename)
      .fetch();
    return rawReport;
  }

  /*
   **  Get an Analyzed Report by name
   */
  async getAnalyzedReport({ params }) {
    const analyzedReport = await AnalyzedReport.query()
      .where("name", params.filename)
      .fetch();
    return await analyzedReport;
  }

  /*
   **  Get an Action Steps List by name
   */
  async getActionStepsReport({ params }) {
    const actionStepsList = await ActionStepsList.query()
      .where("name", params.filename)
      .fetch();
    return await actionStepsList;
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

    RawReport.updateOrCreate(
      { name: rawReport.name },
      { name: rawReport.name, report: rawReport }
    );
    AnalyzedReport.updateOrCreate(
      { name: rawReport.name },
      {
        name: rawReport.name,
        report: analyzedReport,
      }
    );
    ActionStepsList.updateOrCreate(
      { name: rawReport.name },
      {
        name: rawReport.name,
        report: actionStepsList,
      }
    );

    execSync(`npm run remove ${params.name}`);

    return;
  }
}

module.exports = ReportController;
