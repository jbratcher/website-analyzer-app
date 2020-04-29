<template>
  <v-container>
    <v-row>
      <v-col class="mx-auto col-9 col-md-6 py-12">
        <!-- User Sign Up Form -->
        <h1
          :class="{
            'display-1 mb-12': $breakpoint.mdAndUp,
            'headline mb-9': $breakpoint.smAndDown
          }"
        >
          Register
        </h1>

        <v-text-field
          :value="firstName"
          @input="setFirstName"
          label="First Name"
          placeholder="First Name"
        />
        <v-text-field
          :value="lastName"
          @input="setLastName"
          label="Last Name"
          placeholder="Last Name"
        />
        <v-text-field
          :value="registerEmail"
          @input="setRegisterEmail"
          label="Email"
          placeholder="Email"
        />
        <v-text-field
          :value="registerPassword"
          @input="setRegisterPassword"
          label="Password"
          placeholder="Password"
          type="password"
          autocomplete="new-password"
        />
        <v-alert :value="registerError" type="error">{{
          registerError
        }}</v-alert>
        <v-btn @click="register" dark>
          <v-icon class="mr-3">{{ accountPlusIcon }}</v-icon
          >Register
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiAccountPlus } from "@mdi/js";
export default {
  data() {
    return {
      accountPlusIcon: mdiAccountPlus,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      error: null
    };
  },
  methods: {
    async register() {
      try {
        const newUser = {
          email: state.registerEmail,
          password: state.registerPassword,
          firstName: state.firstName,
          lastName: state.lastName
        };
        await this.$axios.post("register", newUser);

        await this.$auth.loginWith("local", {
          data: {
            email: this.email,
            password: this.password
          }
        });
        this.$router.push("/");
      } catch (e) {
        this.error = e.response.data.message;
      }
    }
  }
};
</script>
