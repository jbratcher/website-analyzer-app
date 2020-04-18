<template>
  <v-container class="pa-0" fluid>
    <v-row>
      <v-col class="pa-0">
        <h1 class="display-2">Report Index Page By ID</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState("reports", ["reports"])
  },
  methods: {
    ...mapActions("reports", ["fetchAllReports"])
  },
  created() {
    this.fetchAllReports("airhorner");
  }
};
</script>

<style lang="scss"></style>
