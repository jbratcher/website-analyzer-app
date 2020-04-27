<template>
  <!-- Overall Score -->
  <v-card
    v-if="data"
    class="d-flex flex-column align-center pb-6 text-center"
    height="100%"
  >
    <v-card-text class="headline mt-auto">Score</v-card-text>
    <v-progress-circular
      class="display-2"
      :color="calcScoreColor(data.totalScore)"
      :value="normalizedScore(data.totalScore)"
      size="128"
      width="12"
      >{{ data.totalScore }}</v-progress-circular
    >
  </v-card>
</template>

<script>
import scoreMixin from "../../mixins/scoresMixin";
export default {
  name: "OverallScore",
  props: {
    data: {
      type: [Object, Array]
    }
  },
  mixins: [scoreMixin]
};
</script>

<style></style>
