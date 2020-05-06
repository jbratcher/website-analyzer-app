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
              <Progress
                :transitionDuration="10000"
                :radius="55"
                :strokeWidth="10"
                strokeColor="teal"
                value="100"
              >
                <div class="content">Generating Report</div>
              </Progress>
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
import Progress from "./Progress";
export default {
  name: "CreateNewReport",
  components: {
    Progress
  },
  props: {
    cardClass: {
      type: String,
      default: ""
    }
  },
  mixins: [formRulesMixin],
  data() {
    return {
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
      console.log(
        `Creating report for ${this.reportName} using ${this.websiteUrl}`
      );
      console.log(`isLoading at start: ${this.isLoading}`);
      this.generateNewWebsiteReports({
        reportName: titleCase(this.reportName),
        websiteUrl: this.websiteUrl
      });
    }
  }
};
</script>
<style lang="scss"></style>
