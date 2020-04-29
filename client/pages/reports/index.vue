<template>
  <v-container class="pa-0" fluid>
    <v-row>
      <v-col class="pa-0">
        <h1 class="display-2">Report Index Page</h1>
        <template v-if="user.ownedReports">
          <ul
            v-for="(report, index) in user.ownedReports"
            :key="`${report.name}-${index}`"
          >
            <li>
              <v-btn :to="`/reports/${report.name}`">{{ report.name }}</v-btn>
            </li>
          </ul>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState("authentication", ["user"])
  },
  methods: {
    ...mapActions("authentication", ["fetchOwnedReports"]),
    ...mapMutations("authentication", ["setOwnedReports"])
  },
  mounted() {
    this.fetchOwnedReports();
  }
};
</script>

<style lang="scss"></style>
