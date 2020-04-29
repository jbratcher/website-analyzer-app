export const state = () => ({
  isLoggedIn: null,
  firstName: null,
  lastName: null,
  loginEmail: null,
  loginError: null,
  loginPassword: null,
  registerEmail: null,
  registerError: null,
  registerPassword: null,
  user: null
});

export const actions = {
  async logout({ commit }) {
    await this.$axios.$post("/api/auth/logout");
    commit("setLoggedIn", false);
    commit("setUser", null);
    if (this.$router.currentRoute !== "/") {
      this.$router.push("/");
    }
  },
  async login({ commit, state, rootState }) {
    commit("setLoginError", null);
    await this.$axios
      .$post("/api/auth/login", {
        email: state.loginEmail,
        password: state.loginPassword
      })
      .then(response => {
        console.log(`logging in: ${response.username}`);
        console.log(response);
        commit("setUser", response);
        commit("setLoggedIn", true);
        commit("setLoginEmail", null);
        commit("setLoginError", null);
        commit("setLoginPassword", null);
        if (this.$router.currentRoute !== "/") {
          this.$router.push("/");
        }
      })
      .catch(error => {
        console.log(`Login Error: ${error}`);
      });
  },
  async register({ commit, state, rootState }) {
    commit("setRegisterError", null);
    const newUser = {
      email: state.registerEmail,
      password: state.registerPassword,
      firstName: state.firstName,
      lastName: state.lastName
    };
    await this.$axios
      .$post("/api/auth/register", newUser)
      .then(response => {
        commit("setUser", response);
        commit("setLoggedIn", true);
        commit("setRegisterEmail", null);
        commit("setRegisterError", null);
        commit("setRegisterPassword", null);
        if (this.$router.currentRoute !== "/") {
          this.$router.push("/");
        }
      })
      .catch(error => {
        console.log(`Registration error: ${error}`);
      });
  },
  async fetchLoggedInUser({ commit, state, rootState }) {
    await this.$axios
      .$get(`/api/users/${rootState.authentication.user.id}`)
      .then(response => {
        commit("setUser", response);
      })
      .catch(error => {
        console.log(`Fetch user error: ${error}`);
      });
  },
  async fetchOwnedReports({ commit, state, rootState }) {
    await this.$axios
      .$get(`/api/users/${rootState.authentication.user.id}/reports/`)
      .then(response => {
        console.log(`Response: ${JSON.stringify(response)}`);
        commit("setOwnedReports", response);
      })
      .catch(error => {
        console.log(`Fetch user error: ${error}`);
      });
  }
};

// export const getters = {
//   isLoggedIn(state) {
//     return !!state.token;
//   }
// };

export const mutations = {
  setFirstName(state, firstName) {
    state.firstName = firstName;
  },
  setLastName(state, lastName) {
    state.lastName = lastName;
  },
  setLoginEmail(state, email) {
    state.loginEmail = email;
  },
  setLoginError(state, error) {
    state.loginError = error;
  },
  setLoggedIn(state, loggedIn) {
    state.isLoggedIn = loggedIn;
  },
  setLoginPassword(state, password) {
    state.loginPassword = password;
  },
  setOwnedReports(state, ownedReports) {
    state.user.ownedReports = ownedReports;
  },
  setRegisterEmail(state, email) {
    state.registerEmail = email;
  },
  setRegisterError(state, error) {
    state.registerError = error;
  },
  setRegisterPassword(state, password) {
    state.registerPassword = password;
  },
  setUser(state, user) {
    state.user = user;
  }
};
