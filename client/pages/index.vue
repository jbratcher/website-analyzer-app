<template>
  <v-container class="px-12">
    <v-row>
      <v-col class="pa-0"> <h2>Dashboard</h2></v-col>
    </v-row>
    <v-row>
      <v-col>
        <h2>List of Websites for user</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h2>Add a new site:</h2>
        <form>
          <v-text-field
            v-model="websiteName"
            label="Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="websiteUrl"
            label="URL"
            required
          ></v-text-field>
          <v-btn @click="submit">Fetch Report</v-btn>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      websiteName: "",
      websiteUrl: ""
    };
  },
  methods: {
    ...mapActions("reports", ["generateNewWebsiteReports"]),
    submit() {
      console.log("fetching");
      console.log(this.websiteName);
      console.log(this.websiteUrl);
      this.generateNewWebsiteReports({
        websiteName: this.websiteName,
        websiteUrl: this.websiteUrl
      });
    }
  }
};
</script>
<style lang="scss"></style>
