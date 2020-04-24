export const state = () => ({
  actionStepsList: {},
  allReports: [],
  analyzedReport: {},
  rawReport: {},
  categories: [],
  allAudits: [],
  failingAudits: []
});

export const actions = {
  // fetch all reports for a name
  fetchAllReports({ commit }, websiteName) {
    console.log(`Fetching all reports for: ${websiteName}`);
    return this.$axios
      .$get(`/api/reports/${websiteName}`)
      .then(data => {
        commit("setAllReports", data[0]);
      })
      .catch(error => {
        console.log(`Fetch all reports error: ${error}`);
      });
  },
  // fetch analyzed report by name
  fetchAnalyzedReport({ commit }, websiteName) {
    console.log(`Fetching analyzed report for: ${websiteName}`);
    return this.$axios
      .$get(`/api/reports/analyzed/${websiteName}`)
      .then(data => {
        commit("setAnalyzedReport", data[0]);
        commit("setFailingAudits", data[0].report.audits);
      })
      .catch(error => {
        console.log(`Fetch analyzed report error: ${error}`);
      });
  },
  // fetch raw report by name
  fetchRawReport({ commit }, websiteName) {
    console.log(`Fetching raw report for: ${websiteName}`);
    return this.$axios
      .$get(`/api/reports/raw/${websiteName}`)
      .then(data => {
        commit("setRawReport", data[0]);
        commit("setCategories", data[0].report.categories);
        commit("setAllAudits", data[0].report.audits);
      })
      .catch(error => {
        console.log(`Fetch raw report error: ${error}`);
      });
  },
  // fetch action steps list by name
  fetchActionStepsList({ commit }, websiteName) {
    console.log(`Fetching action steps list for: ${websiteName}`);
    return this.$axios
      .$get(`/api/reports/action-steps/${websiteName}`)
      .then(data => {
        commit("setActionStepsList", data[0]);
      })
      .catch(error => {
        console.log(`Fetch action steps report error: ${error}`);
      });
  }
};

export const mutations = {
  setAllReports(state, reports) {
    state.allReports = reports;
  },
  setAnalyzedReport(state, analyzedReport) {
    state.analyzedReport = analyzedReport;
  },
  setRawReport(state, rawReport) {
    state.rawReport = rawReport;
  },
  setActionStepsList(state, actionStepsList) {
    state.actionStepsList = actionStepsList;
  },
  setCategories(state, rawReportCategories) {
    state.categories = rawReportCategories;
  },
  setAllAudits(state, rawReportAudits) {
    state.allAudits = rawReportAudits;
  },
  setFailingAudits(state, analyzedReportAudits) {
    // Object.entries(analyzedReportAudits).map(entry => {
    //   entry[1].isOpen = false;
    // });
    state.failingAudits = Object.values(analyzedReportAudits);
  }
};
