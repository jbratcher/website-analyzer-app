<template>
  <v-container class="py-0">
    <v-row>
      <v-col class="py-0">
        <!-- Main Dashboard View -->
        <v-container class="pa-0" fluid>
          <!-- Report Score Header View-->
          <v-row>
            <v-col cols="12">
              <v-card>
                <v-container class="pa-0">
                  <v-row>
                    <v-col
                      class="pt-3 pb-0 flex-0"
                      :class="
                        $breakpoint.mdAndUp ? 'd-flex align-baseline' : ''
                      "
                      cols="12"
                    >
                      <v-card-title class="pt-0">{{
                        rawReport.name
                      }}</v-card-title>
                      <v-card-subtitle class="pt-0 pb-1">{{
                        rawReport.requestedUrl
                      }}</v-card-subtitle>
                      <v-card-text class="pt-0 pb-1">{{
                        formattedDateTime
                      }}</v-card-text>
                      <v-card-text
                        v-if="rawReport && rawReport.userAgent"
                        class="pt-0 pb-1 caption"
                        >{{ formattedUserAgent }}</v-card-text
                      >
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
          <v-row align="stretch">
            <v-col cols="12" sm="3" align-self="stretch">
              <!-- Overall Score -->
              <OverallScore :data="analyzedReport" />
            </v-col>
            <v-col cols="12" sm="9" align-self="stretch">
              <!-- Scores by Category -->
              <ScoresDisplay :data="categories" />
            </v-col>
          </v-row>

          <!-- Failing Audits Row  -->
          <SectionHeader sectionName="Failing Audits" />
          <ExpandingCards :data="failingAudits" />

          <!-- Action Steps Row -->
          <SectionHeader sectionName="Action Steps" />
          <ExpandingCards :data="actionSteps" />

          <!-- End Main Container -->
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { titleCase, unhyphenate } from "../../utils/str-utils";
import { mdiChevronDown } from "@mdi/js";
import { mapActions, mapMutations, mapState } from "vuex";
import scoreMixin from "../../mixins/scoresMixin";
import ExpandingCards from "../../components/widgets/ExpandingCards";
import OverallScore from "../../components/widgets/OverallScore";
import ScoresDisplay from "../../components/widgets/ScoresDisplay";
import SectionHeader from "../../components/SectionHeader";
export default {
  components: {
    ExpandingCards,
    OverallScore,
    ScoresDisplay,
    SectionHeader
  },
  mixins: [scoreMixin],
  data() {
    return {
      chevronDown: mdiChevronDown
    };
  },
  computed: {
    ...mapState("reports", [
      "actionSteps",
      "actionStepsList",
      "allAudits",
      "analyzedReport",
      "categories",
      "failingAudits",
      "rawReport",
      "rawReportMeta"
    ]),
    formattedDateTime() {
      if (this.rawReportMeta && this.rawReportMeta.created_at) {
        const rawDateTime = new Date(
          this.rawReportMeta.created_at
        ).toLocaleString();
        const convertedDateTime = rawDateTime.replace(/\([^()]*\)/g, "");
        return convertedDateTime;
      }
    },
    formattedUserAgent() {
      if (this.rawReport && this.rawReport.userAgent) {
        return this.rawReport.userAgent
          .replace(/\([^()]*\)/g, "")
          .replace(/\s/g, ",");
      }
    }
  },
  methods: {
    ...mapActions("reports", [
      "fetchActionStepsList",
      "fetchAnalyzedReport",
      "fetchRawReport"
    ]),
    ...mapMutations("reports", [
      "setActionSteps",
      "setActionStepsList",
      "setAllAudits",
      "setAnalyzedReport",
      "setCategories",
      "setFailingAudits",
      "setRawReport"
    ]),
    toISOLocal(date) {
      const z = n => ("0" + n).slice(-2);
      const zz = n => ("00" + n).slice(-3);
      return (
        date.getFullYear() +
        "-" +
        z(date.getMonth() + 1) +
        "-" +
        z(date.getDate()) +
        "T" +
        z(date.getHours()) +
        ":" +
        z(date.getMinutes()) +
        ":" +
        z(date.getSeconds()) +
        "." +
        zz(date.getMilliseconds()) +
        "Z"
      );
    },
    titleCaseString(string) {
      string = unhyphenate(string);
      string = titleCase(string);
      return string;
    }
  },
  created() {
    this.fetchRawReport(this.$route.params.name);
    this.fetchAnalyzedReport(this.$route.params.name);
    this.fetchActionStepsList(this.$route.params.name);
  }
};
</script>

<style lang="scss"></style>
