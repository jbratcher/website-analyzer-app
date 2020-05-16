<template>
  <v-card class="pa-6" :class="cardClass">
    <form>
      <v-container class="py-0">
        <v-row>
          <v-col class="py-0" cols="12" md="5">
            <v-text-field
              v-model="reportName"
              :prepend-icon="reportIcon"
              clearable
              label="Report Name"
              placeholder="(ex. Google)"
              required
              :rules="shortTextRules"
            ></v-text-field>
          </v-col>
          <v-col class="py-0" cols="12" md="5">
            <v-text-field
              v-model="websiteUrl"
              :prepend-icon="webIcon"
              clearable
              label="Website Address"
              placeholder="(ex. google.com)"
              required
              :rules="urlRules"
            ></v-text-field>
          </v-col>
          <v-col
            class="py-0"
            :class="$breakpoint.mdAndUp ? '' : 'd-flex justify-center'"
            cols="12"
            md="2"
          >
            <template v-if="!isLoading">
              <v-btn @click="submit" color="primary" x-large>
                <v-icon class="mr-2">{{ newReportIcon }}</v-icon>
                Get Report</v-btn
              >
            </template>
            <template v-if="isLoading">
              <v-container class="pa-0">
                <v-row>
                  <v-col class="d-flex flex-column align-center pa-0">
                    <v-progress-circular
                      class="mx-auto"
                      color="teal"
                      indeterminate
                      size="36"
                      width="4"
                    ></v-progress-circular>
                    <p class="text-center">
                      {{
                        isStarting
                          ? "Generating Report"
                          : "Just a few more seconds"
                      }}
                    </p>
                  </v-col>
                </v-row>
              </v-container>
            </template>
          </v-col>
        </v-row>
      </v-container>
    </form>
  </v-card>
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { mdiMagnify, mdiNewspaper, mdiNewspaperPlus, mdiWeb } from "@mdi/js";
import formRulesMixin from "../../mixins/formRulesMixin";
import { titleCase } from "../../utils/str-utils";
export default {
  name: "CreateNewReport",
  props: {
    cardClass: {
      type: String,
      default: ""
    }
  },
  mixins: [formRulesMixin],
  data() {
    return {
      isStarting: true,
      magnifyIcon: mdiMagnify,
      newReportIcon: mdiNewspaperPlus,
      reportIcon: mdiNewspaper,
      webIcon: mdiWeb,
      reportName: "",
      websiteUrl: ""
    };
  },
  computed: {
    ...mapState("reports", ["isLoading"])
  },
  methods: {
    ...mapActions("reports", ["generateNewWebsiteReports"]),
    submit() {
      setTimeout(() => (this.isStarting = !this.isStarting), 5000);
      this.generateNewWebsiteReports({
        reportName: titleCase(this.reportName),
        websiteUrl: this.websiteUrl
      });
    }
  }
};
</script>
<style lang="scss"></style>
