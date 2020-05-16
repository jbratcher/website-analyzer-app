export const state = () => ({
  actionSteps: [],
  actionStepsList: {},
  allAudits: [],
  analyzedReport: {},
  analyzedReportMeta: {},
  categories: [],
  failingAudits: [],
  isLoading: false,
  ownedReports: [],
  rawReport: {},
  rawReportMeta: {}
});

export const actions = {
  // delete a report
  async deleteReports({ commit }, reportName) {
    this.$axios.setHeader("Authorization", this.$auth.$state.tokenlocal);
    await this.$axios
      .$delete(`/reports/${reportName}`)
      .then(data => {
        console.log(`Deleting report: ${reportName}`);
        commit("setOwnedReports", data);
        this.$router.replace("/reports");
      })
      .catch(error => console.warn(`Delete report error: ${error}`));
  },
  // fetch action steps list by name
  async fetchActionStepsList({ commit }, websiteName) {
    this.$axios.setHeader("Authorization", this.$auth.$state.tokenlocal);
    await this.$axios
      .$get(`/reports/${websiteName}/action-steps`)
      .then(data => {
        console.log(data[0]);
        commit("setActionStepsList", data[0]);
        commit("setActionSteps", data[0].report.auditsMatched);
      })
      .catch(error => {
        console.log(`Fetch action steps report error: ${error}`);
      });
  },
  // fetch analyzed report by name
  async fetchAnalyzedReport({ commit }, websiteName) {
    this.$axios.setHeader("Authorization", this.$auth.$state.tokenlocal);
    await this.$axios
      .$get(`/reports/${websiteName}/analyzed`)
      .then(data => {
        console.log(data[0]);
        commit("setAnalyzedReportMeta", data[0]);
        commit("setAnalyzedReport", data[0].report);
        commit("setFailingAudits", data[0].report.audits);
      })
      .catch(error => {
        console.log(`Fetch analyzed report error: ${error}`);
      });
  },
  // fetch reports owned by a specific user
  async fetchOwnedReports({ commit }) {
    this.$axios.setHeader("Authorization", this.$auth.$state.tokenlocal);
    await this.$axios
      .$get(`/reports/`)
      .then(data => {
        commit("setOwnedReports", data);
        this.$router.push("/reports");
      })
      .catch(error => {
        console.log(`Fetch user error: ${error}`);
      });
  },
  // fetch raw report by name
  async fetchRawReport({ commit }, websiteName) {
    this.$axios.setHeader("Authorization", this.$auth.$state.tokenlocal);
    await this.$axios
      .$get(`/reports/${websiteName}/raw`)
      .then(data => {
        console.log(data[0]);
        commit("setRawReportMeta", data[0]);
        commit("setRawReport", data[0].report);
        commit("setCategories", data[0].report.categories);
        commit("setAllAudits", data[0].report.audits);
      })
      .catch(error => {
        console.log(`Fetch raw report error: ${error}`);
      });
  },
  async generateNewWebsiteReports(
    { commit, dispatch },
    { reportName, websiteUrl }
  ) {
    commit("setIsLoading", true);
    this.$axios.setHeader("Authorization", this.$auth.$state.tokenlocal);
    await this.$axios
      .$post(`/reports/generate/${reportName}/${websiteUrl}`)
      .then(response => {
        dispatch("fetchOwnedReports");
      })
      .then(response => {
        commit("setIsLoading", false);
      })
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
  },
  setIsLoading(state, isLoading) {
    state.isLoading = isLoading;
  },
  toggleIsLoading(state) {
    state.isLoading = !state.isLoading;
  }
};
