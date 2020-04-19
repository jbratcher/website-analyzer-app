<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card flat>
          <v-card-title
            >Requested URL: {{ rawReport.requestedUrl }}</v-card-title
          >
          <v-card-text>User Agent: {{ rawReport.userAgent }}</v-card-text>
          <v-card-text
            >Lighthouse version: {{ rawReport.lighthouseVersion }}</v-card-text
          >
          <v-card-text>Fetch Time: {{ rawReport.fetchTime }}</v-card-text>
        </v-card>
        <v-card
          v-for="(category, index) in rawReport.categories"
          :key="`${category.title}${index}`"
        >
          <v-card-title>{{ category.title }}</v-card-title>
          <v-card-subtitle>{{
            normalizedScore(category.score)
          }}</v-card-subtitle>
        </v-card>
        <!-- Report dump -->
        <v-card v-for="(item, index) in rawReport" :key="index">
          <v-card-title>{{ item.constructor.name }}</v-card-title>
          <!-- <v-card-text
            >Object Name:
            {{ Array.from(Object.entries(rawReport[index]))[0] }}</v-card-text
          > -->
          <v-card-text v-if="item.constructor.name === 'Object'"
            >Object Keys: {{ Object.keys(item) }}</v-card-text
          >
          <v-card-text>{{ item }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState("reports", ["rawReport"])
  },
  methods: {
    ...mapActions("reports", ["fetchRawReport"]),
    ...mapMutations("reports", ["setRawReport"]),
    normalizedScore(score) {
      if (score === 1) {
        score = 100;
      }
      return score;
    }
  },
  created() {
    this.fetchRawReport(this.$route.params.name);
  }
};
</script>

<style lang="scss"></style>
