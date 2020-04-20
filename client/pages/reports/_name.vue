<template>
  <v-container>
    <v-row>
      <v-col>
        <!-- Report Score Header View-->
        <v-container>
          <v-row justify="center">
            <v-col
              v-for="(category, index) in rawReport.categories"
              :key="`${category.title}${index}`"
              sm="2"
            >
              <v-card class="d-flex flex-column align-center text-center" flat height="100%">
                <v-card-title class="display-2 primary--text">
                  {{
                  normalizedScore(category.score)
                  }}
                </v-card-title>
                <v-progress-circular
                  :color="calcScoreColor(category.score)"
                  :value="normalizedScore(category.score)"
                ></v-progress-circular>
                <v-card-text class="body-1 mt-auto">{{ category.title }}</v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
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
export default {
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
    ]),
    normalizedScore(score) {
      if (score === 1) {
        score = 100;
      }
      let stringifiedScore = String(score);
      if (stringifiedScore.substring(0, 2) === "0.") {
        score = stringifiedScore.substring(2);
      }
      return score;
    },
    calcScoreColor(score) {
      let scoreColor = "grey";
      let normalizedScore = this.normalizedScore(score);
      if (normalizedScore > 90) {
        scoreColor = "green";
      } else if (normalizedScore < 90 && normalizedScore > 80) {
        scoreColor = "yellow";
      } else if (normalizedScore < 80 && normalizedScore > 70) {
        scoreColor = "orange";
      } else if (normalizedScore < 70) {
        scoreColor = "red";
      } else {
        scoreColor = "grey";
      }
      return scoreColor;
    }
  },
  created() {
    console.log(this.$route.params.name);
    this.fetchRawReport(this.$route.params.name);
    this.fetchAnalyzedReport(this.$route.params.name);
    this.fetchActionStepsList(this.$route.params.name);
  }
};
</script>

<style lang="scss"></style>
