export const state = () => ({
  actionStepsList: [],
  allReports: [],
  analyzedReport: {},
  rawReport: {}
});

export const actions = {
  // fetch all reports for a name
  fetchAllReports({ commit }, websiteName) {
    console.log(`Fetching all reports for: ${websiteName}`);
    return this.$axios
      .$get(`/api/reports/${websiteName}`)
      .then(data => {
        commit("setAllReports", data);
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
        commit("setAnalyzedReport", data);
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
        commit("setRawReport", data);
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
        commit("setActionStepsList", data);
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
  }
};
