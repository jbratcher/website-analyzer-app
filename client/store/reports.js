export const state = () => ({
  actionSteps: [],
  actionStepsList: {},
  allAudits: [],
  analyzedReport: {},
  analyzedReportMeta: {},
  categories: [],
  failingAudits: [],
  ownedReports: [],
  rawReport: {},
  rawReportMeta: {}
});

export const actions = {
  // fetch action steps list by name
  async fetchActionStepsList({ commit }, websiteName) {
    await this.$axios
      .$get(`/api/reports/action-steps/${websiteName}`)
      .then(data => {
        commit("setActionStepsList", data[0]);
        commit("setActionSteps", data[0].report.auditsMatched);
      })
      .catch(error => {
        console.log(`Fetch action steps report error: ${error}`);
      });
  },
  // fetch analyzed report by name
  async fetchAnalyzedReport({ commit }, websiteName) {
    await this.$axios
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
  // fetch reports owned by a specific user
  async fetchOwnedReports({ commit, state, rootState }) {
    await this.$axios
      .$get(`/api/users/${rootState.auth.user.id}/reports/`)
      .then(response => {
        commit("setOwnedReports", response);
      })
      .catch(error => {
        console.log(`Fetch user error: ${error}`);
      });
  },
  // fetch raw report by name
  async fetchRawReport({ commit }, websiteName) {
    await this.$axios
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
  async generateNewWebsiteReports({ commit }, { websiteName, websiteUrl }) {
    await this.$axios
      .$post(`/api/reports/generate/user/${websiteName}/${websiteUrl}`)
      .then(this.$router.push(`/reports/${websiteName}`))
      .catch(error => {
        console.log(`Fetch new website reports error: ${error}`);
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
  setOwnedReports(state, ownedReports) {
    state.ownedReports = ownedReports;
  },
  setRawReport(state, rawReport) {
    state.rawReport = rawReport;
  },
  setRawReportMeta(state, rawReportMeta) {
    state.rawReportMeta = rawReportMeta;
  }
};
