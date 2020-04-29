<template>
  <v-container class="px-12">
    <v-row>
      <v-col>
        <h2>Create a new website report:</h2>
        <v-col class="pa-0" md="3">
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
            <v-btn @click="submit" color="primary">Create Report</v-btn>
          </form>
        </v-col>
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
      console.log(
        `Creating report for ${this.websiteName} using ${this.websiteUrl}`
      );
      this.generateNewWebsiteReports({
        websiteName: this.websiteName,
        websiteUrl: this.websiteUrl
      });
    }
  }
};
</script>
<style lang="scss"></style>
