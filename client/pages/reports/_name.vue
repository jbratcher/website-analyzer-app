<template>
  <v-container class="py-0">
    <v-row>
      <v-col class="py-0">
        <v-container class="pa-0" fluid>
          <v-row align="stretch">
            <v-col cols="12" sm="3" align-self="stretch">
              <!-- Report Score Header View-->
              <!-- Overall Score -->
              <v-card
                v-if="analyzedReport.report"
                class="d-flex flex-column align-center pb-6 text-center"
              >
                <v-card-text class="headline mt-auto">Score</v-card-text>
                <v-progress-circular
                  class="display-2"
                  :color="calcScoreColor(analyzedReport.report.totalScore)"
                  :value="normalizedScore(analyzedReport.report.totalScore)"
                  size="128"
                  width="12"
                  >{{ analyzedReport.report.totalScore }}</v-progress-circular
                >
              </v-card>
            </v-col>
            <v-col cols="12" sm="9" align-self="stretch">
              <!-- Categories Score -->
              <v-card height="100%">
                <v-container class="pa-0">
                  <v-row>
                    <v-col
                      v-for="(category, index) in categories"
                      :key="`${category.title}${index}`"
                    >
                      <v-card
                        class="d-flex flex-column align-center text-center"
                        flat
                        height="100%"
                      >
                        <v-card-text class="body-1">
                          {{ category.title }}
                        </v-card-text>
                        <v-progress-circular
                          class="display-1 mt-auto"
                          :color="calcScoreColor(category.score)"
                          :value="normalizedScore(category.score)"
                          size="96"
                          width="9"
                          >{{
                            normalizedScore(category.score)
                          }}</v-progress-circular
                        >
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
          <!-- Failing Audits -->
          <v-row>
            <v-col class="pb-0">
              <v-card color="#fefefe" flat>
                <v-card-title class="display-1 py-1">Audits</v-card-title>
              </v-card>
            </v-col>
          </v-row>
          <v-row align="stretch">
            <v-col
              v-for="(audit, index) in failingAudits"
              :key="`${audit.title}${index}`"
              :class="`${index}`"
              align-self="stretch"
              cols="12"
              sm="6"
              md="3"
            >
              <v-expansion-panels>
                <v-expansion-panel>
                  <v-expansion-panel-header
                    class="flex-column icon-center"
                    :expandIcon="chevronDown"
                  >
                    <h3 class="mb-3">
                      {{ titleCaseString(audit.id) }}
                    </h3>
                    <v-progress-circular
                      class="title"
                      :color="calcScoreColor(audit.score)"
                      :value="normalizedScore(audit.score)"
                      size="64"
                      width="6"
                      >{{ normalizedScore(audit.score) }}</v-progress-circular
                    >
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <p class="font-weight-bold">
                      {{ audit.title }}
                    </p>
                    <p>{{ audit.description }}</p>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
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
export default {
  mixins: [scoreMixin],
  data() {
    return {
      chevronDown: mdiChevronDown
    };
  },
  computed: {
    ...mapState("reports", [
      "rawReport",
      "analyzedReport",
      "actionStepsList",
      "categories",
      "allAudits",
      "failingAudits"
    ])
  },
  methods: {
    ...mapActions("reports", [
      "fetchRawReport",
      "fetchAnalyzedReport",
      "fetchActionStepsList"
    ]),
    ...mapMutations("reports", [
      "setRawReport",
      "setAnalyzedReport",
      "setActionStepsList",
      "setCategories",
      "setAllAudits",
      "setFailingAudits"
    ]),
    titleCaseString(string) {
      string = unhyphenate(string);
      string = titleCase(string);
      return string;
    }
  },
  mounted() {
    console.log(this.$route.params.name);
    this.fetchRawReport(this.$route.params.name);
    this.fetchAnalyzedReport(this.$route.params.name);
    this.fetchActionStepsList(this.$route.params.name);
  }
};
</script>

<style lang="scss">
.v-expansion-panel-header.icon-center > .v-expansion-panel-header__icon {
  margin: 0;
}
</style>
