export const state = () => ({
  reports: []
});

export const actions = {
  // fetch all reports for a name
  fetchAllReports({ commit }, report) {
    console.log(`Fetching report for: ${report}`);
    return this.$axios
      .$get(`/api/reports/${report}`)
      .then(data => {
        commit("setReports", data);
      })
      .catch(error => {
        console.log(`Fetch reports error: ${error}`);
      });
  }
};

export const mutations = {
  setReports(state, reports) {
    state = reports;
  }
};
