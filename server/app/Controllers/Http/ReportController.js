"use strict";

const Helpers = use("Helpers");
const execSync = require("child_process").execSync;

class ReportController {
  index() {
    return "Report Index Route";
  }

  getReports({ params }) {
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
    return reports;
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
  }
}

module.exports = ReportController;
