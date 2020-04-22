<template>
  <v-container>
    <v-row>
      <v-col>
        <!-- Report Score Header View-->
        <!-- Overall Score -->
        <v-card class="d-flex flex-column align-center py-6 text-center" flat>
          <v-card-title class="font-weight-bold pb-0">Overall Score</v-card-title>
          <v-card-text class="display-4 green--text">{{ analyzedReport.totalScore }}</v-card-text>
        </v-card>
        <!-- Categories Score -->
        <v-card>
          <v-container class="pa-0">
            <v-row justify="center">
              <v-col
                v-for="(category, index) in rawReport.categories"
                :key="`${category.title}${index}`"
                sm="2"
              >
                <v-card
                  class="category-card d-flex flex-column align-center text-center"
                  flat
                  height="100%"
                >
                  <v-progress-circular
                    class="display-2"
                    :color="calcScoreColor(category.score)"
                    :value="normalizedScore(category.score)"
                    size="128"
                    width="12"
                  >
                    {{
                    normalizedScore(category.score)
                    }}
                  </v-progress-circular>
                  <v-card-text class="body-1 mt-auto">{{ category.title }}</v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <!-- <v-card>
          <v-card-text>{{ rawReport.userAgent }}</v-card-text>
          <v-card-text>{{ analyzedReport.name }}</v-card-text>
          <v-card-text>{{ actionStepsList[0] }}</v-card-text>
        </v-card>-->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import scoreMixin from "../../mixins/scoresMixin";
export default {
  mixins: [scoreMixin],
  computed: {
    ...mapState("reports", ["rawReport", "analyzedReport", "actionStepsList"])
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
      "setActionStepsList"
    ])
  },
  created() {
    console.log(this.$route.params.name);
    this.fetchRawReport(this.$route.params.name);
    this.fetchAnalyzedReport(this.$route.params.name);
    this.fetchActionStepsList(this.$route.params.name);
  }
};
</script>

<style lang="scss">
.category-card {
  position: relative;
  & > .category-card-score {
    position: absolute;
    top: 12%;
  }
}
</style>
