"use strict";

const execSync = require("child_process").execSync;

const ActionStepsList = use("App/Models/ActionStepsList");
const AnalyzedReport = use("App/Models/AnalyzedReport");
const Database = use("Database");
const Helpers = use("Helpers");
const RawReport = use("App/Models/RawReport");
const User = use("App/Models/User");

// read lighthouse report and convert to business report
const json = require(Helpers.appRoot("/scripts/utility/json.js"));

class ReportController {
  async index({ auth }) {
    const user = await auth.getUser();

    const userActionStepsList = await ActionStepsList.query()
      .where("user_id", user.id)
      .fetch();
    const userAnalyzedReports = await Analyzed.query()
      .where("user_id", user.id)
      .fetch();
    const userRawReports = await RawReports.query()
      .where("user_id", user.id)
      .fetch();

    let userReports = await Promise.all([
      userActionStepsList,
      userAnalyzedReports,
      userRawReports,
    ]);
    return userReports;
  }

  /*
   **  Get all reports by name
   */
  async getReports({ params, auth }) {
    const user = await auth.getUser();

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
  async generateReportByUser({ params, auth }) {
    const user = await auth.getUser();
    execSync(
      `npm run fetch ${params.name} https://${params.url} && npm run analyze ${params.name}`
    );
    this.saveReportsByUser({ params }, user);
  }

  /*
   ** save a generated report to the database
   */
  async saveReportsByUser({ params }, user) {
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

    this.createOrUpdateReportByUser(ActionStepsList, user, actionStepsList);
    this.createOrUpdateReportByUser(AnalyzedReport, user, analyzedReport);
    this.createOrUpdateReportByUser(RawReport, user, rawReport);

    execSync(`npm run remove ${params.name}`);
  }

  /*
   ** Create or update a report owned by a specific user
   ** @params:
   ** String model: the model to create/update
   ** Lucid Model user: the current user object
   ** JSON report: the JSON of the report to be stored
   ** String relation: the relation name property of the model
   */
  async createOrUpdateReportByUser(model, user, report, relation) {
    // fetch all reports owned by user
    const userReports = await model.query().where("user_id", user.id).fetch();

    // fetch matching report from database
    const reportsOwnedByUser = await model
      .query()
      .where("user_id", user.id)
      .where("name", report.name)
      .first();

    // transform userReports object to array of reports
    let reportsMap = Object.values(userReports)[0];

    // if new report, create report
    if (!reportsMap.some((userReport) => userReport.name === report.name)) {
      console.log("Report not found, creating...");
      // todo: map model name to relation method (only 3 but may expand report types later)
      if (model === ActionStepsList) {
        await user
          .actionStepsLists()
          .create({ name: report.name, report: report });
      } else if (model === AnalyzedReport) {
        await user
          .analyzedReports()
          .create({ name: report.name, report: report });
      } else if (model === RawReport) {
        await user.rawReports().create({ name: report.name, report: report });
      } else {
        console.log(`Report type: ${model} : not found`);
        return null;
      }
    } else {
      // if report exists, update report
      console.log(`Report already owned by user, updating...`);
      await reportsOwnedByUser.merge({ report: report });
      await reportsOwnedByUser.save();
    }
    return report;
  }
}

module.exports = ReportController;
