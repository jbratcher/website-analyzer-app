export const state = () => ({
  actionSteps: [],
  actionStepsList: {},
  allAudits: [],
  allReports: [],
  analyzedReport: {},
  analyzedReportMeta: {},
  categories: [],
  failingAudits: [],
  rawReport: {},
  rawReportMeta: {}
});

export const actions = {
  // fetch analyzed report by name
  fetchAnalyzedReport({ commit }, websiteName) {
    return this.$axios
      .$get(`/api/reports/analyzed/${websiteName}`)
      .then(data => {
        commit("setAnalyzedReportMeta", data[0]);
        commit("setAnalyzedReport", data[0].report);
        commit("setFailingAudits", data[0].report.audits);
      })
      .catch(error => {
        console.log(`Fetch analyzed report error: ${error}`);
      });
  },
  // fetch raw report by name
  fetchRawReport({ commit }, websiteName) {
    return this.$axios
      .$get(`/api/reports/raw/${websiteName}`)
      .then(data => {
        commit("setRawReportMeta", data[0]);
        commit("setRawReport", data[0].report);
        commit("setCategories", data[0].report.categories);
        commit("setAllAudits", data[0].report.audits);
      })
      .catch(error => {
        console.log(`Fetch raw report error: ${error}`);
      });
  },
  // fetch action steps list by name
  fetchActionStepsList({ commit }, websiteName) {
    return this.$axios
      .$get(`/api/reports/action-steps/${websiteName}`)
      .then(data => {
        commit("setActionStepsList", data[0]);
        commit("setActionSteps", data[0].report.auditsMatched);
      })
      .catch(error => {
        console.log(`Fetch action steps report error: ${error}`);
      });
  }
};

export const mutations = {
  setActionSteps(state, actionSteps) {
    state.actionSteps = Object.values(actionSteps);
  },
  setActionStepsList(state, actionStepsList) {
    state.actionStepsList = actionStepsList;
  },
  setAllAudits(state, rawReportAudits) {
    state.allAudits = rawReportAudits;
  },
  setAllReports(state, reports) {
    state.allReports = reports;
  },
  setAnalyzedReport(state, analyzedReport) {
    state.analyzedReport = analyzedReport;
  },
  setAnalyzedReportMeta(state, analyzedReportMeta) {
    state.analyzedReportMeta = analyzedReportMeta;
  },
  setCategories(state, rawReportCategories) {
    state.categories = rawReportCategories;
  },
  setFailingAudits(state, analyzedReportAudits) {
    state.failingAudits = Object.values(analyzedReportAudits);
  },
  setRawReport(state, rawReport) {
    state.rawReport = rawReport;
  },
  setRawReportMeta(state, rawReportMeta) {
    state.rawReportMeta = rawReportMeta;
  }
};
