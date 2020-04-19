<template>
  <v-container>
    <v-row>
      <v-col>
        <h2>{{ analyzedReport.name }}</h2>
        <p>{{ analyzedReport.url }}</p>
        <v-card
          v-for="(audit, index) in analyzedReport.audits"
          :key="`${audit.name}${index}`"
        >
          <v-card-title>{{ audit.title }}</v-card-title>
          <v-card-text>{{ audit.description }}</v-card-text>
          <v-card-text>{{ normalizedScore(audit.score) }}</v-card-text>
          <v-card-text>{{ audit.displayValue }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState("reports", ["analyzedReport"])
  },
  methods: {
    ...mapActions("reports", ["fetchAnalyzedReport"]),
    ...mapMutations("reports", ["setAnalyzedReport"]),
    normalizedScore(score) {
      if (score === 1) {
        score = 100;
      }
      return score;
    }
  },
  created() {
    this.fetchAnalyzedReport(this.$route.params.name);
  }
};
</script>

<style lang="scss"></style>
