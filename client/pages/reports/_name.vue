<template>
  <v-container class="py-0">
    <v-row>
      <v-col class="py-0">
        <!-- Main Dashboard View -->
        <v-container class="pa-0" fluid>
          <!-- Report Header-->
          <ReportHeader :rawReport="rawReport" :rawReportMeta="rawReportMeta" />

          <!-- Score Overview -->
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
import ReportHeader from "../../components/widgets/ReportHeader";
import ScoresDisplay from "../../components/widgets/ScoresDisplay";
import SectionHeader from "../../components/SectionHeader";
export default {
  components: {
    ExpandingCards,
    OverallScore,
    ReportHeader,
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
    ])
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
    ])
  },
  created() {
    this.fetchRawReport(this.$route.params.name);
    this.fetchAnalyzedReport(this.$route.params.name);
    this.fetchActionStepsList(this.$route.params.name);
  }
};
</script>

<style lang="scss"></style>
